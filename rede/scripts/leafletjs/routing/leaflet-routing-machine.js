(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    function corslite(url, callback, cors) {
        var sent = false;
    
        if (typeof window.XMLHttpRequest === 'undefined') {
            return callback(Error('Browser not supported'));
        }
    
        if (typeof cors === 'undefined') {
            var m = url.match(/^\s*https?:\/\/[^\/]*/);
            cors = m && (m[0] !== location.protocol + '//' + location.hostname +
                    (location.port ? ':' + location.port : ''));
        }
    
        var x = new window.XMLHttpRequest();
    
        function isSuccessful(status) {
            return status >= 200 && status < 300 || status === 304;
        }
    
        if (cors && !('withCredentials' in x)) {
            // IE8-9
            x = new window.XDomainRequest();
    
            // Ensure callback is never called synchronously, i.e., before
            // x.send() returns (this has been observed in the wild).
            // See https://github.com/mapbox/mapbox.js/issues/472
            var original = callback;
            callback = function() {
                if (sent) {
                    original.apply(this, arguments);
                } else {
                    var that = this, args = arguments;
                    setTimeout(function() {
                        original.apply(that, args);
                    }, 0);
                }
            }
        }
    
        function loaded() {
            if (
                // XDomainRequest
                x.status === undefined ||
                // modern browsers
                isSuccessful(x.status)) callback.call(x, null, x);
            else callback.call(x, x, null);
        }
    
        // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
        // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
        if ('onload' in x) {
            x.onload = loaded;
        } else {
            x.onreadystatechange = function readystate() {
                if (x.readyState === 4) {
                    loaded();
                }
            };
        }
    
        // Call the callback with the XMLHttpRequest object as an error and prevent
        // it from ever being called again by reassigning it to `noop`
        x.onerror = function error(evt) {
            // XDomainRequest provides no evt parameter
            callback.call(this, evt || true, null);
            callback = function() { };
        };
    
        // IE9 must have onprogress be set to a unique function.
        x.onprogress = function() { };
    
        x.ontimeout = function(evt) {
            callback.call(this, evt, null);
            callback = function() { };
        };
    
        x.onabort = function(evt) {
            callback.call(this, evt, null);
            callback = function() { };
        };
    
        // GET is the only supported HTTP Verb by XDomainRequest and is the
        // only one supported here.
        x.open('GET', url, true);
    
        // Send the request. Sending data is not supported.
        x.send(null);
        sent = true;
    
        return x;
    }
    
    if (typeof module !== 'undefined') module.exports = corslite;
    
    },{}],2:[function(_dereq_,module,exports){
    module.exports = function(version, language, options) {
        // load instructions
        var instructions = _dereq_('./instructions').get(language);
        if (Object !== instructions.constructor) throw 'instructions must be object';
        if (!instructions[version]) { throw 'invalid version ' + version; }
    
        return {
            capitalizeFirstLetter: function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            ordinalize: function(number) {
                // Transform numbers to their translated ordinalized value
                return instructions[version].constants.ordinalize[number.toString()] || '';
            },
            directionFromDegree: function(degree) {
                // Transform degrees to their translated compass direction
                if (!degree && degree !== 0) {
                    // step had no bearing_after degree, ignoring
                    return '';
                } else if (degree >= 0 && degree <= 20) {
                    return instructions[version].constants.direction.north;
                } else if (degree > 20 && degree < 70) {
                    return instructions[version].constants.direction.northeast;
                } else if (degree >= 70 && degree < 110) {
                    return instructions[version].constants.direction.east;
                } else if (degree >= 110 && degree <= 160) {
                    return instructions[version].constants.direction.southeast;
                } else if (degree > 160 && degree <= 200) {
                    return instructions[version].constants.direction.south;
                } else if (degree > 200 && degree < 250) {
                    return instructions[version].constants.direction.southwest;
                } else if (degree >= 250 && degree <= 290) {
                    return instructions[version].constants.direction.west;
                } else if (degree > 290 && degree < 340) {
                    return instructions[version].constants.direction.northwest;
                } else if (degree >= 340 && degree <= 360) {
                    return instructions[version].constants.direction.north;
                } else {
                    throw new Error('Degree ' + degree + ' invalid');
                }
            },
            laneConfig: function(step) {
                // Reduce any lane combination down to a contracted lane diagram
                if (!step.intersections || !step.intersections[0].lanes) throw new Error('No lanes object');
    
                var config = [];
                var currentLaneValidity = null;
    
                step.intersections[0].lanes.forEach(function (lane) {
                    if (currentLaneValidity === null || currentLaneValidity !== lane.valid) {
                        if (lane.valid) {
                            config.push('o');
                        } else {
                            config.push('x');
                        }
                        currentLaneValidity = lane.valid;
                    }
                });
    
                return config.join('');
            },
            compile: function(step) {
                if (!step.maneuver) throw new Error('No step maneuver provided');
    
                var type = step.maneuver.type;
                var modifier = step.maneuver.modifier;
                var mode = step.mode;
    
                if (!type) { throw new Error('Missing step maneuver type'); }
                if (type !== 'depart' && type !== 'arrive' && !modifier) { throw new Error('Missing step maneuver modifier'); }
    
                if (!instructions[version][type]) {
                    // Log for debugging
                    console.log('Encountered unknown instruction type: ' + type); // eslint-disable-line no-console
                    // OSRM specification assumes turn types can be added without
                    // major version changes. Unknown types are to be treated as
                    // type `turn` by clients
                    type = 'turn';
                }
    
                // Use special instructions if available, otherwise `defaultinstruction`
                var instructionObject;
                if (instructions[version].modes[mode]) {
                    instructionObject = instructions[version].modes[mode];
                } else if (instructions[version][type][modifier]) {
                    instructionObject = instructions[version][type][modifier];
                } else {
                    instructionObject = instructions[version][type].default;
                }
    
                // Special case handling
                var laneInstruction;
                switch (type) {
                case 'use lane':
                    laneInstruction = instructions[version].constants.lanes[this.laneConfig(step)];
    
                    if (!laneInstruction) {
                        // If the lane combination is not found, default to continue straight
                        instructionObject = instructions[version]['use lane'].no_lanes;
                    }
                    break;
                case 'rotary':
                case 'roundabout':
                    if (step.rotary_name && step.maneuver.exit && instructionObject.name_exit) {
                        instructionObject = instructionObject.name_exit;
                    } else if (step.rotary_name && instructionObject.name) {
                        instructionObject = instructionObject.name;
                    } else if (step.maneuver.exit && instructionObject.exit) {
                        instructionObject = instructionObject.exit;
                    } else {
                        instructionObject = instructionObject.default;
                    }
                    break;
                default:
                    // NOOP, since no special logic for that type
                }
    
                // Decide way_name with special handling for name and ref
                var wayName;
                var name = step.name || '';
                var ref = (step.ref || '').split(';')[0];
    
                // Remove hacks from Mapbox Directions mixing ref into name
                if (name === step.ref) {
                    // if both are the same we assume that there used to be an empty name, with the ref being filled in for it
                    // we only need to retain the ref then
                    name = '';
                }
                name = name.replace(' (' + step.ref + ')', '');
    
                if (name && ref && name !== ref) {
                    wayName = name + ' (' + ref + ')';
                } else if (!name && ref) {
                    wayName = ref;
                } else {
                    wayName = name;
                }
    
                // Decide which instruction string to use
                // Destination takes precedence over name
                var instruction;
                if (step.destinations && instructionObject.destination) {
                    instruction = instructionObject.destination;
                } else if (wayName && instructionObject.name) {
                    instruction = instructionObject.name;
                } else {
                    instruction = instructionObject.default;
                }
    
                var tokenizedInstructionHook = ((options || {}).hooks || {}).tokenizedInstruction;
                if (tokenizedInstructionHook) {
                    instruction = tokenizedInstructionHook(instruction);
                }
    
                // Replace tokens
                // NOOP if they don't exist
                var nthWaypoint = ''; // TODO, add correct waypoint counting
                instruction = instruction
                    .replace('{way_name}', wayName)
                    .replace('{destination}', (step.destinations || '').split(',')[0])
                    .replace('{exit_number}', this.ordinalize(step.maneuver.exit || 1))
                    .replace('{rotary_name}', step.rotary_name)
                    .replace('{lane_instruction}', laneInstruction)
                    .replace('{modifier}', instructions[version].constants.modifier[modifier])
                    .replace('{direction}', this.directionFromDegree(step.maneuver.bearing_after))
                    .replace('{nth}', nthWaypoint)
                    .replace(/ {2}/g, ' '); // remove excess spaces
    
                if (instructions.meta.capitalizeFirstLetter) {
                    instruction = this.capitalizeFirstLetter(instruction);
                }
    
                return instruction;
            }
        };
    };
    
    },{"./instructions":3}],3:[function(_dereq_,module,exports){
    var instructionsDe = _dereq_('./instructions/de.json');
    var instructionsEn = _dereq_('./instructions/en.json');
    var instructionsFr = _dereq_('./instructions/fr.json');
    var instructionsNl = _dereq_('./instructions/nl.json');
    var instructionsZhHans = _dereq_('./instructions/zh-Hans.json');
    
    module.exports = {
        get: function(language) {
            switch (language) {
            case 'en':
                return instructionsEn;
            case 'de':
                return instructionsDe;
            case 'fr':
                return instructionsFr;
            case 'nl':
                return instructionsNl;
            case 'zh':
            case 'zh-Hans':
                return instructionsZhHans;
            default:
                throw 'invalid language ' + language;
            }
        }
    };
    
    },{"./instructions/de.json":4,"./instructions/en.json":5,"./instructions/fr.json":6,"./instructions/nl.json":7,"./instructions/zh-Hans.json":8}],4:[function(_dereq_,module,exports){
    module.exports={
        "meta": {
            "capitalizeFirstLetter": true
        },
        "v5": {
            "constants": {
                "ordinalize": {
                    "1": "erste",
                    "2": "zweite",
                    "3": "dritte",
                    "4": "vierte",
                    "5": "fÃ¼nfte",
                    "6": "sechste",
                    "7": "siebente",
                    "8": "achte",
                    "9": "neunte",
                    "10": "zehnte"
                },
                "direction": {
                    "north": "Norden",
                    "northeast": "Nordosten",
                    "east": "Osten",
                    "southeast": "SÃ¼dosten",
                    "south": "SÃ¼den",
                    "southwest": "SÃ¼dwesten",
                    "west": "Westen",
                    "northwest": "Nordwesten"
                },
                "modifier": {
                    "left": "links",
                    "right": "rechts",
                    "sharp left": "scharf links",
                    "sharp right": "scharf rechts",
                    "slight left": "leicht links",
                    "slight right": "leicht rechts",
                    "straight": "geradeaus",
                    "uturn": "180Â°-Wendung"
                },
                "lanes": {
                    "xo": "Rechts halten",
                    "ox": "Links halten",
                    "xox": "Mittlere Spur nutzen",
                    "oxo": "Rechts oder links halten"
                }
            },
            "modes": {
                "ferry": {
                    "default": "FÃ¤hre nehmen",
                    "name": "FÃ¤hre nehmen {way_name}",
                    "destination": "FÃ¤hre nehmen Richtung {destination}"
                }
            },
            "arrive": {
                "default": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht"
                },
                "left": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                },
                "right": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                },
                "sharp left": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                },
                "sharp right": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                },
                "slight right": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                },
                "slight left": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                },
                "straight": {
                    "default": "Sie haben Ihr {nth} Ziel erreicht, es befindet sich direkt vor Ihnen"
                }
            },
            "continue": {
                "default": {
                    "default": "{modifier} weiterfahren",
                    "name": "{modifier} weiterfahren auf {way_name}",
                    "destination": "{modifier} weiterfahren Richtung {destination}"
                },
                "slight left": {
                    "default": "Leicht links weiter",
                    "name": "Leicht links weiter auf {way_name}",
                    "destination": "Leicht links weiter Richtung {destination}"
                },
                "slight right": {
                    "default": "Leicht rechts weiter",
                    "name": "Leicht rechts weiter auf {way_name}",
                    "destination": "Leicht rechts weiter Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung",
                    "name": "180Â°-Wendung auf {way_name}",
                    "destination": "180Â°-Wendung Richtung {destination}"
                }
            },
            "depart": {
                "default": {
                    "default": "Fahren Sie Richtung {direction}",
                    "name": "Fahren Sie Richtung {direction} auf {way_name}"
                }
            },
            "end of road": {
                "default": {
                    "default": "{modifier} abbiegen",
                    "name": "{modifier} abbiegen auf {way_name}",
                    "destination": "{modifier} abbiegen Richtung {destination}"
                },
                "straight": {
                    "default": "Geradeaus weiterfahren",
                    "name": "Geradeaus weiterfahren auf {way_name}",
                    "destination": "Geradeaus weiterfahren Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung am Ende der StraÃŸe",
                    "name": "180Â°-Wendung auf {way_name} am Ende der StraÃŸe",
                    "destination": "180Â°-Wendung Richtung {destination} am Ende der StraÃŸe"
                }
            },
            "fork": {
                "default": {
                    "default": "{modifier} halten an der Gabelung",
                    "name": "{modifier} halten an der Gabelung auf {way_name}",
                    "destination": "{modifier}  halten an der Gabelung Richtung {destination}"
                },
                "slight left": {
                    "default": "Links halten an der Gabelung",
                    "name": "Links halten an der Gabelung auf {way_name}",
                    "destination": "Links halten an der Gabelung Richtung {destination}"
                },
                "slight right": {
                    "default": "Rechts halten an der Gabelung",
                    "name": "Rechts halten an der Gabelung auf {way_name}",
                    "destination": "Rechts halten an der Gabelung Richtung {destination}"
                },
                "sharp left": {
                    "default": "Scharf links abbiegen an der Gabelung",
                    "name": "Scharf links abbiegen an der Gabelung auf {way_name}",
                    "destination": "Scharf links abbiegen an der Gabelung Richtung {destination}"
                },
                "sharp right": {
                    "default": "Scharf rechts abbiegen an der Gabelung",
                    "name": "Scharf rechts abbiegen an der Gabelung auf {way_name}",
                    "destination": "Scharf rechts abbiegen an der Gabelung Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung",
                    "name": "180Â°-Wendung auf {way_name}",
                    "destination": "180Â°-Wendung Richtung {destination}"
                }
            },
            "merge": {
                "default": {
                    "default": "{modifier} auffahren",
                    "name": "{modifier} auffahren auf {way_name}",
                    "destination": "{modifier} auffahren Richtung {destination}"
                },
                "slight left": {
                    "default": "Leicht links auffahren",
                    "name": "Leicht links auffahren auf {way_name}",
                    "destination": "Leicht links auffahren Richtung {destination}"
                },
                "slight right": {
                    "default": "Leicht rechts auffahren",
                    "name": "Leicht rechts auffahren auf {way_name}",
                    "destination": "Leicht rechts auffahren Richtung {destination}"
                },
                "sharp left": {
                    "default": "Scharf links auffahren",
                    "name": "Scharf links auffahren auf {way_name}",
                    "destination": "Scharf links auffahren Richtung {destination}"
                },
                "sharp right": {
                    "default": "Scharf rechts auffahren",
                    "name": "Scharf rechts auffahren auf {way_name}",
                    "destination": "Scharf rechts auffahren Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung",
                    "name": "180Â°-Wendung auf {way_name}",
                    "destination": "180Â°-Wendung Richtung {destination}"
                }
            },
            "new name": {
                "default": {
                    "default": "{modifier} weiterfahren",
                    "name": "{modifier} weiterfahren auf {way_name}",
                    "destination": "{modifier} weiterfahren Richtung {destination}"
                },
                "sharp left": {
                    "default": "Scharf links",
                    "name": "Scharf links auf {way_name}",
                    "destination": "Scharf links Richtung {destination}"
                },
                "sharp right": {
                    "default": "Scharf rechts",
                    "name": "Scharf rechts auf {way_name}",
                    "destination": "Scharf rechts Richtung {destination}"
                },
                "slight left": {
                    "default": "Leicht links weiter",
                    "name": "Leicht links weiter auf {way_name}",
                    "destination": "Leicht links weiter Richtung {destination}"
                },
                "slight right": {
                    "default": "Leicht rechts weiter",
                    "name": "Leicht rechts weiter auf {way_name}",
                    "destination": "Leicht rechts weiter Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung",
                    "name": "180Â°-Wendung auf {way_name}",
                    "destination": "180Â°-Wendung Richtung {destination}"
                }
            },
            "notification": {
                "default": {
                    "default": "{modifier} weiterfahren",
                    "name": "{modifier} weiterfahren auf {way_name}",
                    "destination" : "{modifier} weiterfahren Richtung {destination}"
                },
                "uturn": {
                    "default": "180Â°-Wendung",
                    "name": "180Â°-Wendung auf {way_name}",
                    "destination": "180Â°-Wendung Richtung {destination}"
                }
            },
            "off ramp": {
                "default": {
                    "default": "Rampe nehmen",
                    "name": "Rampe nehmen auf {way_name}",
                    "destination": "Rampe nehmen Richtung {destination}"
                },
                "left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                },
                "sharp left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "sharp right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                },
                "slight left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "slight right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                }
            },
            "on ramp": {
                "default": {
                    "default": "Rampe nehmen",
                    "name": "Rampe nehmen auf {way_name}",
                    "destination": "Rampe nehmen Richtung {destination}"
                },
                "left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                },
                "sharp left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "sharp right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                },
                "slight left": {
                    "default": "Rampe auf der linken Seite nehmen",
                    "name": "Rampe auf der linken Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der linken Seite nehmen Richtung {destination}"
                },
                "slight right": {
                    "default": "Rampe auf der rechten Seite nehmen",
                    "name": "Rampe auf der rechten Seite nehmen auf {way_name}",
                    "destination": "Rampe auf der rechten Seite nehmen Richtung {destination}"
                }
            },
            "rotary": {
                "default": {
                    "default": {
                        "default": "In den Kreisverkehr fahren",
                        "name": "In den Kreisverkehr fahren und auf {way_name} verlassen",
                        "destination": "In den Kreisverkehr fahren und Richtung {destination} verlassen"
                    },
                    "name": {
                        "default": "In {rotary_name} fahren",
                        "name": "In {rotary_name} fahren und auf {way_name} verlassen",
                        "destination": "In {rotary_name} fahren und Richtung {destination} verlassen"
                    },
                    "exit": {
                        "default": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                        "name": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                        "destination": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                    },
                    "name_exit": {
                        "default": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                        "name": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                        "destination": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                    }
                }
            },
            "roundabout": {
                "default": {
                    "exit": {
                        "default": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                        "name": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                        "destination": "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                    },
                    "default": {
                        "default": "In den Kreisverkehr fahren",
                        "name": "In den Kreisverkehr fahren und auf {way_name} verlassen",
                        "destination": "In den Kreisverkehr fahren und Richtung {destination} verlassen"
                    }
                }
            },
            "roundabout turn": {
                "default": {
                    "default": "Am Kreisverkehr {modifier}",
                    "name": "Am Kreisverkehr {modifier} auf {way_name}",
                    "destination": "Am Kreisverkehr {modifier} Richtung {destination}"
                },
                "left": {
                    "default": "Am Kreisverkehr links",
                    "name": "Am Kreisverkehr links auf {way_name}",
                    "destination": "Am Kreisverkehr links Richtung {destination}"
                },
                "right": {
                    "default": "Am Kreisverkehr rechts",
                    "name": "Am Kreisverkehr rechts auf {way_name}",
                    "destination": "Am Kreisverkehr rechts Richtung {destination}"
                },
                "straight": {
                    "default": "Am Kreisverkehr geradeaus weiterfahren",
                    "name": "Am Kreisverkehr geradeaus weiterfahren auf {way_name}",
                    "destination": "Am Kreisverkehr geradeaus weiterfahren Richtung {destination}"
                }
            },
            "turn": {
                "default": {
                    "default": "{modifier} abbiegen",
                    "name": "{modifier} abbiegen auf {way_name}",
                    "destination": "{modifier} abbiegen Richtung {destination}"
                },
                "left": {
                    "default": "Links abbiegen",
                    "name": "Links abbiegen auf {way_name}",
                    "destination": "Links abbiegen Richtung {destination}"
                },
                "right": {
                    "default": "Rechts abbiegen",
                    "name": "Rechts abbiegen auf {way_name}",
                    "destination": "Rechts abbiegen Richtung {destination}"
                },
                "straight": {
                    "default": "Geradeaus weiterfahren",
                    "name": "Geradeaus weiterfahren auf {way_name}",
                    "destination": "Geradeaus weiterfahren Richtung {destination}"
                }
            },
            "use lane": {
                "no_lanes": {
                    "default": "Geradeaus weiterfahren"
                },
                "default": {
                    "default": "{lane_instruction}"
                }
            }
        }
    }
    
    },{}],5:[function(_dereq_,module,exports){
    module.exports={
        "meta": {
            "capitalizeFirstLetter": true
        },
        "v5": {
            "constants": {
                "ordinalize": {
                    "1": "1Âª",
                    "2": "2Âª",
                    "3": "3Âª",
                    "4": "4Âª",
                    "5": "5Âª",
                    "6": "6Âª",
                    "7": "7Âª",
                    "8": "8Âª",
                    "9": "9Âª",
                    "10": "10Âª"
                },
                "direction": {
                    "north": "norte",
                    "northeast": "nordeste",
                    "east": "leste",
                    "southeast": "sudeste",
                    "south": "sul",
                    "southwest": "sudoeste",
                    "west": "oeste",
                    "northwest": "noroeste"
                },
                "modifier": {
                    "left": "esquerda",
                    "right": "direita",
                    "sharp left": "acentuada Ã  esquerda",
                    "sharp right": "acentuada Ã  direita",
                    "slight left": "suave Ã  esquerda",
                    "slight right": "suave Ã  direita right",
                    "straight": "direto",
                    "uturn": "retorno"
                },
                "lanes": {
                    "xo": "Mantenha-se Ã  direita",
                    "ox": "Mantenha-se Ã  esquerda",
                    "xox": "Mantenha-se no meio",
                    "oxo": "Mantenha-se Ã  esquerda ou Ã  direita"
                }
            },
            "modes": {
                "ferry": {
                    "default": "Pegue a balsa",
                    "name": "Pegue a balsa {way_name}",
                    "destination": "Pegue a balsa em direÃ§Ã£o Ã  {destination}"
                }
            },
            "arrive": {
                "default": {
                    "default": "VocÃª chegou ao seu {nth} destino"
                },
                "left": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the left"
                },
                "right": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the right"
                },
                "sharp left": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the left"
                },
                "sharp right": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the right"
                },
                "slight right": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the right"
                },
                "slight left": {
                    "default": "VocÃª chegou ao seu {nth} destino, on the left"
                },
                "straight": {
                    "default": "VocÃª chegou ao seu {nth} destino, straight ahead"
                }
            },
            "continue": {
                "default": {
                    "default": "Continue Ã  {modifier}",
                    "name": "Continue Ã  {modifier} para {way_name}",
                    "destination": "Continue Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Curva suave Ã  esquerda",
                    "name": "Curva suave Ã  esquerda para {way_name}",
                    "destination": "Curva suave Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Curva suave Ã  direita",
                    "name": "Curva suave Ã  direita para {way_name}",
                    "destination": "Curva suave Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno",
                    "name": "FaÃ§a um retorno para {way_name}",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination}"
                }
            },
            "depart": {
                "default": {
                    "default": "Siga para {direction}",
                    "name": "Siga para {direction} na {way_name}"
                }
            },
            "end of road": {
                "default": {
                    "default": "Vire Ã  {modifier}",
                    "name": "Vire Ã  {modifier} em {way_name}",
                    "destination": "Vire Ã  {modifier} em direÃ§Ã o Ã  {destination}"
                },
                "straight": {
                    "default": "Continue em frente",
                    "name": "Continue em frente para {way_name}",
                    "destination": "Continue em frente em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno no final da rua",
                    "name": "FaÃ§a um retorno para {way_name} no final da rua",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination} no final da rua"
                }
            },
            "fork": {
                "default": {
                    "default": "Mantenha-se Ã  {modifier} na bifurcaÃ§Ã£o",
                    "name": "Mantenha-se Ã  {modifier} na bifurcaÃ§Ã£o para {way_name}",
                    "destination": "Mantenha-se Ã  {modifier} na bifurcaÃ§Ã£o em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Mantenha-se Ã  esquerda na bifurcaÃ§Ã£o",
                    "name": "Mantenha-se Ã  esquerda na bifurcaÃ§Ã£o para {way_name}",
                    "destination": "Mantenha-se Ã  esquerda na bifurcaÃ§Ã£o em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Mantenha-se Ã  direita na bifurcaÃ§Ã£o",
                    "name": "Mantenha-se Ã  direita na bifurcaÃ§Ã£o para {way_name}",
                    "destination": "Mantenha-se Ã  direita na bifurcaÃ§Ã£o em direÃ§Ã£o Ã  {destination}"
                },
                "sharp left": {
                    "default": "FaÃ§a uma curva para a esquerda na bifurcaÃ§Ã£o",
                    "name": "FaÃ§a uma curva para a esquerda na bifurcaÃ§Ã£o para {way_name}",
                    "destination": "FaÃ§a uma curva para a esquerda na bifurcaÃ§Ã£o em direÃ§Ã£o Ã  {destination}"
                },
                "sharp right": {
                    "default": "FaÃ§a uma curva para a direita na bifurcaÃ§Ã£o",
                    "name": "FaÃ§a uma curva para a direita na bifurcaÃ§Ã£o para {way_name}",
                    "destination": "FaÃ§a uma curva para a direita na bifurcaÃ§Ã£o em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno",
                    "name": "FaÃ§a um retorno para {way_name}",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination}"
                }
            },
            "merge": {
                "default": {
                    "default": "Junte-se Ã  {modifier}",
                    "name": "Junte-se Ã  {modifier} para {way_name}",
                    "destination": "Junte-se Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Junte-se Ã  esquerda",
                    "name": "Junte-se Ã  esquerda para {way_name}",
                    "destination": "Junte-se Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Junte-se Ã  direita",
                    "name": "Junte-se Ã  direita para {way_name}",
                    "destination": "Junte-se Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "sharp left": {
                    "default": "Junte-se Ã  esquerda",
                    "name": "Junte-se Ã  esquerda para {way_name}",
                    "destination": "Junte-se Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "sharp right": {
                    "default": "Junte-se Ã  direita",
                    "name": "Junte-se Ã  direita para {way_name}",
                    "destination": "Junte-se Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno",
                    "name": "FaÃ§a um retorno para {way_name}",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination}"
                }
            },
            "new name": {
                "default": {
                    "default": "Continue Ã  {modifier}",
                    "name": "Continue Ã  {modifier} para {way_name}",
                    "destination": "Continue Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "sharp left": {
                    "default": "Curva acentuada Ã  esquerda",
                    "name": "Curva acentuada Ã  esquerda para {way_name}",
                    "destination": "Curva acentuada Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "sharp right": {
                    "default": "Curva acentuada Ã  direita",
                    "name": "Curva acentuada Ã  direita para {way_name}",
                    "destination": "Curva acentuada Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Curva suave Ã  esquerda",
                    "name": "Curva suave Ã  esquerda para {way_name}",
                    "destination": "Curva suave Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Curva suave Ã  direita",
                    "name": "Curva suave Ã  direita para {way_name}",
                    "destination": "Curva suave Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno",
                    "name": "FaÃ§a um retorno para {way_name}",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination}"
                }
            },
            "notification": {
                "default": {
                    "default": "Continue Ã  {modifier}",
                    "name": "Continue Ã  {modifier} para {way_name}",
                    "destination" : "Continue Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "uturn": {
                    "default": "FaÃ§a um retorno",
                    "name": "FaÃ§a um retorno para {way_name}",
                    "destination": "FaÃ§a um retorno em direÃ§Ã£o Ã  {destination}"
                }
            },
            "off ramp": {
                "default": {
                    "default": "Pegue a rampa",
                    "name": "Pegue a rampa para {way_name}",
                    "destination": "Pegue a rampa em direÃ§Ã£o Ã  {destination}"
                },
                "left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "sharp left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "sharp right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                }
            },
            "on ramp": {
                "default": {
                    "default": "Pegue a rampa",
                    "name": "Pegue a rampa para {way_name}",
                    "destination": "Pegue a rampa em direÃ§Ã£o Ã  {destination}"
                },
                "left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "sharp left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "sharp right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "slight left": {
                    "default": "Pegue a rampa Ã  esquerda",
                    "name": "Pegue a rampa Ã  esquerda para {way_name}",
                    "destination": "Pegue a rampa Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "slight right": {
                    "default": "Pegue a rampa Ã  direita",
                    "name": "Pegue a rampa Ã  direita para {way_name}",
                    "destination": "Pegue a rampa Ã  direita em direÃ§Ã£o Ã  {destination}"
                }
            },
            "rotary": {
                "default": {
                    "default": {
                        "default": "Entre na rotatÃ³ria",
                        "name": "Entre na rotatÃ³ria e saia para {way_name}",
                        "destination": "Entre na rotatÃ³ria e saia em direÃ§Ã£o Ã  {destination}"
                    },
                    "name": {
                        "default": "Entre na {rotary_name}",
                        "name": "Entre na {rotary_name} e saia para {way_name}",
                        "destination": "Entre na {rotary_name} e saia em direÃ§Ã£o Ã  {destination}"
                    },
                    "exit": {
                        "default": "Entre na rotatÃ³ria e pegue a {exit_number} saÃ­da",
                        "name": "Entre na rotatÃ³ria e pegue a {exit_number} saÃ­da para {way_name}",
                        "destination": "Entre na rotatÃ³ria e pegue a {exit_number} saÃ­da em direÃ§Ã£o Ã  {destination}"
                    },
                    "name_exit": {
                        "default": "Entre na {rotary_name} e peque a {exit_number} saÃ­da",
                        "name": "Entre na {rotary_name} e pegue a {exit_number} saÃ­da para {way_name}",
                        "destination": "Entre na {rotary_name} e pegue a {exit_number} saÃ­da em direÃ§Ã£o Ã  {destination}"
                    }
                }
            },
            "roundabout": {
                "default": {
                    "exit": {
                        "default": "Entre na rotatÃ³ria e peque a {exit_number} saÃ­da",
                        "name": "Entre na rotatÃ³ria e peque a {exit_number} saÃ­da para {way_name}",
                        "destination": "Entre na rotatÃ³ria e peque a {exit_number} saÃ­da em direÃ§Ã£o Ã  {destination}"
                    },
                    "default": {
                        "default": "Entre na rotatÃ³ria",
                        "name": "Entre na rotatÃ³ria e saia para {way_name}",
                        "destination": "Entre na rotatÃ³ria e saia em direÃ§Ã£o Ã  {destination}"
                    }
                }
            },
            "roundabout turn": {
                "default": {
                    "default": "Na rotatÃ³ria vire Ã  {modifier}",
                    "name": "Na rotatÃ³ria vire Ã  {modifier} para {way_name}",
                    "destination": "Na rotatÃ³ria vire Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "left": {
                    "default": "Na rotatÃ³ria vire Ã  esquerda",
                    "name": "Na rotatÃ³ria vire Ã  esquerda para {way_name}",
                    "destination": "Na rotatÃ³ria vire Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "right": {
                    "default": "Na rotatÃ³ria vire Ã  direita",
                    "name": "Na rotatÃ³ria vire Ã  direita para {way_name}",
                    "destination": "Na rotatÃ³ria vire Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "straight": {
                    "default": "Na rotatÃ³ria, continue em frente",
                    "name": "Na rotatÃ³ria, continue em frente para {way_name}",
                    "destination": "Na rotatÃ³ria, continue em frente em direÃ§Ã£o Ã  {destination}"
                }
            },
            "turn": {
                "default": {
                    "default": "Vire Ã  {modifier}",
                    "name": "Vire Ã  {modifier} para {way_name}",
                    "destination": "Vire Ã  {modifier} em direÃ§Ã£o Ã  {destination}"
                },
                "left": {
                    "default": "Vire Ã  esquerda",
                    "name": "Vire Ã  esquerda para {way_name}",
                    "destination": "Vire Ã  esquerda em direÃ§Ã£o Ã  {destination}"
                },
                "right": {
                    "default": "Vire Ã  direita",
                    "name": "Vire Ã  direita para {way_name}",
                    "destination": "Vire Ã  direita em direÃ§Ã£o Ã  {destination}"
                },
                "straight": {
                    "default": "Siga em frente",
                    "name": "Siga em frente para {way_name}",
                    "destination": "Siga em frente em direÃ§Ã£o Ã  {destination}"
                }
            },
            "use lane": {
                "no_lanes": {
                    "default": "Continue em frente"
                },
                "default": {
                    "default": "{lane_instruction}"
                }
            }
        }
    }
    
    },{}],6:[function(_dereq_,module,exports){
    module.exports={
        "meta": {
            "capitalizeFirstLetter": true
        },
        "v5": {
            "constants": {
                "ordinalize": {
                    "1": "premiÃ¨re",
                    "2": "seconde",
                    "3": "troisiÃ¨me",
                    "4": "quatriÃ¨me",
                    "5": "cinquiÃ¨me",
                    "6": "sixiÃ¨me",
                    "7": "setpiÃ¨me",
                    "8": "huitiÃ¨me",
                    "9": "neuviÃ¨me",
                    "10": "dixiÃ¨me"
                },
                "direction": {
                    "north": "le nord",
                    "northeast": "le nord-est",
                    "east": "l'est",
                    "southeast": "le sud-est",
                    "south": "le sud",
                    "southwest": "le sud-ouest",
                    "west": "l'ouest",
                    "northwest": "le nord-ouest"
                },
                "modifier": {
                    "left": "Ã  gauche",
                    "right": "Ã  droite",
                    "sharp left": "franchement Ã  gauche",
                    "sharp right": "franchement Ã  droite",
                    "slight left": "lÃ©gÃ¨rement Ã  gauche",
                    "slight right": "lÃ©gÃ¨rement Ã  droite",
                    "straight": "tout droit",
                    "uturn": "demi-tour"
                },
                "lanes": {
                    "xo": "Serrer Ã  droite",
                    "ox": "Serrer Ã  gauche",
                    "xox": "Rester au milieu",
                    "oxo": "Rester Ã  gauche ou Ã  droite"
                }
            },
            "modes": {
                "ferry": {
                    "default": "Prendre le ferry",
                    "name": "Prendre le ferry {way_name}",
                    "destination": "Prendre le ferry en direction de {destination}"
                }
            },
            "arrive": {
                "default": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination"
                },
                "left": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la gauche"
                },
                "right": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la droite"
                },
                "sharp left": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la gauche"
                },
                "sharp right": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la droite"
                },
                "slight right": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la droite"
                },
                "slight left": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, sur la gauche"
                },
                "straight": {
                    "default": "Vous Ãªtes arrivÃ©s Ã  votre {nth} destination, droit devant"
                }
            },
            "continue": {
                "default": {
                    "default": "Continuer {modifier}",
                    "name": "Continuer {modifier} sur {way_name}",
                    "destination": "Continuer {modifier} en direction de {destination}"
                },
                "slight left": {
                    "default": "Continuer lÃ©gÃ¨rement Ã  gauche",
                    "name": "Continuer lÃ©gÃ¨rement Ã  gauche sur {way_name}",
                    "destination": "Continuer lÃ©gÃ¨rement Ã  gauche en direction de {destination}"
                },
                "slight right": {
                    "default": "Continuer lÃ©gÃ¨rement Ã  droite",
                    "name": "Continuer lÃ©gÃ¨rement Ã  droite sur {way_name}",
                    "destination": "Continuer lÃ©gÃ¨rement Ã  droite en direction de {destination}"
                },
                "uturn": {
                    "default": "Faire demi-tour",
                    "name": "Faire demi-tour sur {way_name}",
                    "destination": "Faire demi-tour en direction de {destination}"
                }
            },
            "depart": {
                "default": {
                    "default": "Rouler vers {direction}",
                    "name": "Rouler vers {direction} sur {way_name}"
                }
            },
            "end of road": {
                "default": {
                    "default": "Tourner {modifier}",
                    "name": "Tourner {modifier} sur {way_name}",
                    "destination": "Tourner {modifier} en direction de {destination}"
                },
                "straight": {
                    "default": "Continuer tout droit",
                    "name": "Continuer tout droit sur {way_name}",
                    "destination": "Continuer tout droit en direction de {destination}"
                },
                "uturn": {
                    "default": "Faire demi-tour Ã  la fin de la route",
                    "name": "Faire demi-tour Ã  la fin de la route {way_name}",
                    "destination": "Faire demi-tour Ã  la fin de la route en direction de {destination}"
                }
            },
            "fork": {
                "default": {
                    "default": "Rester {modifier} Ã  l'embranchement",
                    "name": "Rester {modifier} Ã  l'embranchement sur {way_name}",
                    "destination": "Rester {modifier} Ã  l'embranchement en direction de {destination}"
                },
                "slight left": {
                    "default": "Rester Ã  gauche Ã  l'embranchement",
                    "name": "Rester Ã  gauche Ã  l'embranchement sur {way_name}",
                    "destination": "Rester Ã  gauche Ã  l'embranchement en direction de {destination}"
                },
                "slight right": {
                    "default": "Rester Ã  droite Ã  l'embranchement",
                    "name": "Rester Ã  droite Ã  l'embranchement sur {way_name}",
                    "destination": "Rester Ã  droite Ã  l'embranchement en direction de {destination}"
                },
                "sharp left": {
                    "default": "Prendre Ã  gauche Ã  l'embranchement",
                    "name": "Prendre Ã  gauche Ã  l'embranchement sur {way_name}",
                    "destination": "Prendre Ã  gauche Ã  l'embranchement en direction de {destination}"
                },
                "sharp right": {
                    "default": "Prendre Ã  droite Ã  l'embranchement",
                    "name": "Prendre Ã  droite Ã  l'embranchement sur {way_name}",
                    "destination": "Prendre Ã  droite Ã  l'embranchement en direction de {destination}"
                },
                "uturn": {
                    "default": "Faire demi-tour",
                    "name": "Faire demi-tour sur {way_name}",
                    "destination": "Faire demi-tour en direction de {destination}"
                }
            },
            "merge": {
                "default": {
                    "default": "Rejoindre {modifier}",
                    "name": "Rejoindre {modifier} sur {way_name}",
                    "destination": "Rejoindre {modifier} en direction de {destination}"
                },
                "slight left": {
                    "default": "Rejoindre lÃ©gÃ¨rement par la gauche",
                    "name": "Rejoindre {way_name} lÃ©gÃ¨rement par la gauche",
                    "destination": "Rejoindre lÃ©gÃ¨rement par la gauche la route en direction de {destination}"
                },
                "slight right": {
                    "default": "Rejoindre lÃ©gÃ¨rement par la droite",
                    "name": "Rejoindre {way_name} lÃ©gÃ¨rement par la droite",
                    "destination": "Rejoindre lÃ©gÃ¨rement par la droite la route en direction de {destination}"
                },
                "sharp left": {
                    "default": "Rejoindre par la gauche",
                    "name": "Rejoindre {way_name} par la gauche",
                    "destination": "Rejoindre par la gauche la route en direction de {destination}"
                },
                "sharp right": {
                    "default": "Rejoindre par la droite",
                    "name": "Rejoindre {way_name} par la droite",
                    "destination": "Rejoindre par la droite la route en direction de {destination}"
                },
                "uturn": {
                    "default": "Fair demi-tour",
                    "name": "Fair demi-tour sur {way_name}",
                    "destination": "Fair demi-tour en direction de {destination}"
                }
            },
            "new name": {
                "default": {
                    "default": "Continuer {modifier}",
                    "name": "Continuer {modifier} sur {way_name}",
                    "destination": "Continuer {modifier} en direction de {destination}"
                },
                "sharp left": {
                    "default": "Prendre Ã  gauche",
                    "name": "Prendre Ã  gauche sur {way_name}",
                    "destination": "Prendre Ã  gauche en direction de {destination}"
                },
                "sharp right": {
                    "default": "Prendre Ã  droite",
                    "name": "Prendre Ã  droite sur {way_name}",
                    "destination": "Prendre Ã  droite en direction de {destination}"
                },
                "slight left": {
                    "default": "Continuer lÃ©gÃ¨rement Ã  gauche",
                    "name": "Continuer lÃ©gÃ¨rement Ã  gauche sur {way_name}",
                    "destination": "Continuer lÃ©gÃ¨rement Ã  gauche en direction de {destination}"
                },
                "slight right": {
                    "default": "Continuer lÃ©gÃ¨rement Ã  droite",
                    "name": "Continuer lÃ©gÃ¨rement Ã  droite sur {way_name}",
                    "destination": "Continuer lÃ©gÃ¨rement Ã  droite en direction de {destination}"
                },
                "uturn": {
                    "default": "Fair demi-tour",
                    "name": "Fair demi-tour sur {way_name}",
                    "destination": "Fair demi-tour en direction de {destination}"
                }
            },
            "notification": {
                "default": {
                    "default": "Continuer {modifier}",
                    "name": "Continuer {modifier} sur {way_name}",
                    "destination" : "Continuer {modifier} en direction de {destination}"
                },
                "uturn": {
                    "default": "Fair demi-tour",
                    "name": "Fair demi-tour sur {way_name}",
                    "destination": "Fair demi-tour en direction de {destination}"
                }
            },
            "off ramp": {
                "default": {
                    "default": "Prendre la sortie",
                    "name": "Prendre la sortie sur {way_name}",
                    "destination": "Prendre la sortie en direction de {destination}"
                },
                "left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                },
                "sharp left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "sharp right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                },
                "slight left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "slight right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                }
            },
            "on ramp": {
                "default": {
                    "default": "Prendre la sortie",
                    "name": "Prendre la sortie sur {way_name}",
                    "destination": "Prendre la sortie en direction de {destination}"
                },
                "left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                },
                "sharp left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "sharp right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                },
                "slight left": {
                    "default": "Prendre la sortie Ã  gauche",
                    "name": "Prendre la sortie Ã  gauche sur {way_name}",
                    "destination": "Prendre la sortie Ã  gauche en direction de {destination}"
                },
                "slight right": {
                    "default": "Prendre la sortie Ã  droite",
                    "name": "Prendre la sortie Ã  droite sur {way_name}",
                    "destination": "Prendre la sortie Ã  droite en direction de {destination}"
                }
            },
            "rotary": {
                "default": {
                    "default": {
                        "default": "Entrer dans le rond-point",
                        "name": "Entrer dans le rond-point et sortir par {way_name}",
                        "destination": "Entrer dans le rond-point et sortir en direction de {destination}"
                    },
                    "name": {
                        "default": "Entrer dans le rond-point {rotary_name}",
                        "name": "Entrer dans le rond-point {rotary_name} et sortir par {way_name}",
                        "destination": "Entrer dans le rond-point {rotary_name} et sortir en direction de {destination}"
                    },
                    "exit": {
                        "default": "Entrer dans le rond-point et prendre la {exit_number} sortie",
                        "name": "Entrer dans le rond-point et prendre la {exit_number} sortie sur {way_name}",
                        "destination": "Entrer dans le rond-point et prendre la {exit_number} sortie en direction de {destination}"
                    },
                    "name_exit": {
                        "default": "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie",
                        "name": "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie sur {way_name}",
                        "destination": "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie en direction de {destination}"
                    }
                }
            },
            "roundabout": {
                "default": {
                    "exit": {
                        "default": "Entrer dans le rond-point et prendre la {exit_number} sortie",
                        "name": "Entrer dans le rond-point et prendre la {exit_number} sortie sur {way_name}",
                        "destination": "Entrer dans le rond-point et prendre la {exit_number} sortie en direction de {destination}"
                    },
                    "default": {
                        "default": "Entrer dans le rond-point",
                        "name": "Entrer dans le rond-point et sortir par {way_name}",
                        "destination": "Entrer dans le rond-point et sortir en direction de {destination}"
                    }
                }
            },
            "roundabout turn": {
                "default": {
                    "default": "Au rond-point, tourner {modifier}",
                    "name": "Au rond-point, tourner {modifier} sur {way_name}",
                    "destination": "Au rond-point, tourner {modifier} en direction de {destination}"
                },
                "left": {
                    "default": "Au rond-point, tourner Ã  gauche",
                    "name": "Au rond-point, tourner Ã  gauche sur {way_name}",
                    "destination": "Au rond-point, tourner Ã  gauche en direction de {destination}"
                },
                "right": {
                    "default": "Au rond-point, tourner Ã  droite",
                    "name": "Au rond-point, tourner Ã  droite sur {way_name}",
                    "destination": "Au rond-point, tourner Ã  droite en direction de {destination}"
                },
                "straight": {
                    "default": "Au rond-point, continuer tout droit",
                    "name": "Au rond-point, continuer tout droit sur {way_name}",
                    "destination": "Au rond-point, continuer tout droit en direction de {destination}"
                }
            },
            "turn": {
                "default": {
                    "default": "Tourner {modifier}",
                    "name": "Tourner {modifier} sur {way_name}",
                    "destination": "Tourner {modifier} en direction de {destination}"
                },
                "left": {
                    "default": "Tourner Ã  gauche",
                    "name": "Tourner Ã  gauche sur {way_name}",
                    "destination": "Tourner Ã  gauche en direction de {destination}"
                },
                "right": {
                    "default": "Tourner Ã  droite",
                    "name": "Tourner Ã  droite sur {way_name}",
                    "destination": "Tourner Ã  droite en direction de {destination}"
                },
                "straight": {
                    "default": "Aller tout droit",
                    "name": "Aller tout droit sur {way_name}",
                    "destination": "Aller tout droit en direction de {destination}"
                }
            },
            "use lane": {
                "no_lanes": {
                    "default": "Continuer tout droit"
                },
                "default": {
                    "default": "{lane_instruction} pour continuer {modifier}"
                },
                "straight": {
                    "default": "{lane_instruction}"
                },
                "left": {
                    "default": "{lane_instruction} pour tourner Ã  gauche"
                },
                "right": {
                    "default": "{lane_instruction} pour tourner Ã  droite"
                }
            }
        }
    }
    
    },{}],7:[function(_dereq_,module,exports){
    module.exports={
        "meta": {
            "capitalizeFirstLetter": true
        },
        "v5": {
            "constants": {
                "ordinalize": {
                    "1": "eerste",
                    "2": "tweede",
                    "3": "derde",
                    "4": "vierde",
                    "5": "vijfde",
                    "6": "zesde",
                    "7": "zevende",
                    "8": "achtste",
                    "9": "negende",
                    "10": "tiende"
                },
                "direction": {
                    "north": "noord",
                    "northeast": "noordoost",
                    "east": "oost",
                    "southeast": "zuidoost",
                    "south": "zuid",
                    "southwest": "zuidwest",
                    "west": "west",
                    "northwest": "noordwest"
                },
                "modifier": {
                    "left": "links",
                    "right": "rechts",
                    "sharp left": "linksaf",
                    "sharp right": "rechtsaf",
                    "slight left": "links",
                    "slight right": "rechts",
                    "straight": "rechtdoor",
                    "uturn": "omkeren"
                },
                "lanes": {
                    "xo": "Rechts aanhouden",
                    "ox": "Links aanhouden",
                    "xox": "In het midden blijven",
                    "oxo": "Links of rechts blijven"
                }
            },
            "modes": {
                "ferry": {
                    "default": "Neem het veer",
                    "name": "Neem het veer {way_name}",
                    "destination": "Neem het veer naar {destination}"
                }
            },
            "arrive": {
                "default": {
                    "default": "Je bent gearriveerd op de {nth} bestemming."
                },
                "left": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                },
                "right": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                },
                "sharp left": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                },
                "sharp right": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                },
                "slight right": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                },
                "slight left": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                },
                "straight": {
                    "default": "Je bent gearriveerd. De {nth} bestemming bevindt zich voor je."
                }
            },
            "continue": {
                "default": {
                    "default": "Ga {modifier}",
                    "name": "Ga {modifier} naar {way_name}",
                    "destination": "Ga {modifier} richting {destination}"
                },
                "slight left": {
                    "default": "Links aanhouden",
                    "name": "Links aanhouden naar {way_name}",
                    "destination": "Links aanhouden richting {destination}"
                },
                "slight right": {
                    "default": "Rechts aanhouden",
                    "name": "Rechts aanhouden naar {way_name}",
                    "destination": "Rechts aanhouden richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "depart": {
                "default": {
                    "default": "Vertrek in {direction}elijke richting",
                    "name": "Neem {way_name} in {direction}elijke richting"
                }
            },
            "end of road": {
                "default": {
                    "default": "Ga {modifier}",
                    "name": "Ga {modifier} naar {way_name}",
                    "destination": "Ga {modifier} richting {destination}"
                },
                "straight": {
                    "default": "Ga in de aangegeven richting",
                    "name": "Ga naar {way_name}",
                    "destination": "Ga richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "fork": {
                "default": {
                    "default": "Ga {modifier} op de splitsing",
                    "name": "Ga {modifier} op de splitsing naar {way_name}",
                    "destination": "Ga {modifier} op de splitsing richting {destination}"
                },
                "slight left": {
                    "default": "Links aanhouden op de splitsing",
                    "name": "Links aanhouden op de splitsing naar {way_name}",
                    "destination": "Links aanhouden op de splitsing richting {destination}"
                },
                "slight right": {
                    "default": "Rechts aanhouden op de splitsing",
                    "name": "Rechts aanhouden op de splitsing naar {way_name}",
                    "destination": "Rechts aanhouden op de splitsing richting {destination}"
                },
                "sharp left": {
                    "default": "Linksaf op de splitsing",
                    "name": "Linksaf op de splitsing naar {way_name}",
                    "destination": "Linksaf op de splitsing richting {destination}"
                },
                "sharp right": {
                  "default": "Rechtsaf op de splitsing",
                  "name": "Rechtsaf op de splitsing naar {way_name}",
                  "destination": "Rechtsaf op de splitsing richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "merge": {
                "default": {
                    "default": "Bij de splitsing {modifier}",
                    "name": "Bij de splitsing {modifier} naar {way_name}",
                    "destination": "Bij de splitsing {modifier} richting {destination}"
                },
                "slight left": {
                    "default": "Bij de splitsing links aanhouden",
                    "name": "Bij de splitsing links aanhouden naar {way_name}",
                    "destination": "Bij de splitsing links aanhouden richting {destination}"
                },
                "slight right": {
                    "default": "Bij de splitsing rechts aanhouden",
                    "name": "Bij de splitsing rechts aanhouden naar {way_name}",
                    "destination": "Bij de splitsing rechts aanhouden richting {destination}"
                },
                "sharp left": {
                    "default": "Bij de splitsing linksaf",
                    "name": "Bij de splitsing linksaf naar {way_name}",
                    "destination": "Bij de splitsing linksaf richting {destination}"
                },
                "sharp right": {
                    "default": "Bij de splitsing rechtsaf",
                    "name": "Bij de splitsing rechtsaf naar {way_name}",
                    "destination": "Bij de splitsing rechtsaf richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "new name": {
                "default": {
                    "default": "Ga {modifier}",
                    "name": "Ga {modifier} naar {way_name}",
                    "destination": "Ga {modifier} richting {destination}"
                },
                "sharp left": {
                    "default": "Linksaf",
                    "name": "Linksaf naar {way_name}",
                    "destination": "Linksaf richting {destination}"
                },
                "sharp right": {
                    "default": "Rechtsaf",
                    "name": "Rechtsaf naar {way_name}",
                    "destination": "Rechtsaf richting {destination}"
                },
                "slight left": {
                    "default": "Links aanhouden",
                    "name": "Links aanhouden naar {way_name}",
                    "destination": "Links aanhouden richting {destination}"
                },
                "slight right": {
                    "default": "Rechts aanhouden",
                    "name": "Rechts aanhouden naar {way_name}",
                    "destination": "Rechts aanhouden richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "notification": {
                "default": {
                    "default": "Ga {modifier}",
                    "name": "Ga {modifier} naar {way_name}",
                    "destination" : "Ga {modifier} richting {destination}"
                },
                "uturn": {
                    "default": "Keer om",
                    "name": "Keer om naar {way_name}",
                    "destination": "Keer om richting {destination}"
                }
            },
            "off ramp": {
                "default": {
                    "default": "Neem de afrit",
                    "name": "Neem de afrit naar {way_name}",
                    "destination": "Neem de afrit richting {destination}"
                },
                "left": {
                    "default": "Neem de afrit links",
                    "name": "Neem de afrit links naar {way_name}",
                    "destination": "Neem de afrit links richting {destination}"
                },
                "right": {
                  "default": "Neem de afrit rechts",
                  "name": "Neem de afrit rechts naar {way_name}",
                  "destination": "Neem de afrit rechts richting {destination}"
                },
                "sharp left": {
                    "default": "Neem de afrit links",
                    "name": "Neem de afrit links naar {way_name}",
                    "destination": "Neem de afrit links richting {destination}"
                },
                "sharp right": {
                    "default": "Neem de afrit rechts",
                    "name": "Neem de afrit rechts naar {way_name}",
                    "destination": "Neem de afrit rechts richting {destination}"
                },
                "slight left": {
                    "default": "Neem de afrit links",
                    "name": "Neem de afrit links naar {way_name}",
                    "destination": "Neem de afrit links richting {destination}"
                },
                "slight right": {
                    "default": "Neem de afrit rechts",
                    "name": "Neem de afrit rechts naar {way_name}",
                    "destination": "Neem de afrit rechts richting {destination}"
                }
            },
            "on ramp": {
                "default": {
                    "default": "Neem de oprit",
                    "name": "Neem de oprit naar {way_name}",
                    "destination": "Neem de oprit richting {destination}"
                },
                "left": {
                    "default": "Neem de oprit links",
                    "name": "Neem de oprit links naar {way_name}",
                    "destination": "Neem de oprit links richting {destination}"
                },
                "right": {
                  "default": "Neem de oprit rechts",
                  "name": "Neem de oprit rechts naar {way_name}",
                  "destination": "Neem de oprit rechts richting {destination}"
                },
                "sharp left": {
                    "default": "Neem de oprit links",
                    "name": "Neem de oprit links naar {way_name}",
                    "destination": "Neem de oprit links richting {destination}"
                },
                "sharp right": {
                    "default": "Neem de oprit rechts",
                    "name": "Neem de oprit rechts naar {way_name}",
                    "destination": "Neem de oprit rechts richting {destination}"
                },
                "slight left": {
                    "default": "Neem de oprit links",
                    "name": "Neem de oprit links naar {way_name}",
                    "destination": "Neem de oprit links richting {destination}"
                },
                "slight right": {
                    "default": "Neem de oprit rechts",
                    "name": "Neem de oprit rechts naar {way_name}",
                    "destination": "Neem de oprit rechts richting {destination}"
                }
            },
            "rotary": {
                "default": {
                    "default": {
                        "default": "Ga het knooppunt op",
                        "name": "Verlaat het knooppunt naar {way_name}",
                        "destination": "Verlaat het knooppunt richting {destination}"
                    },
                    "name": {
                        "default": "Ga het knooppunt {rotary_name} op",
                        "name": "Verlaat het knooppunt {rotary_name} naar {way_name}",
                        "destination": "Verlaat het knooppunt {rotary_name} richting {destination}"
                    },
                    "exit": {
                        "default": "Ga het knooppunt op en neem afslag {exit_number}",
                        "name": "Ga het knooppunt op en neem afslag {exit_number} naar {way_name}",
                        "destination": "Ga het knooppunt op en neem afslag {exit_number} richting {destination}"
                    },
                    "name_exit": {
                        "default": "Ga het knooppunt {rotary_name} op en neem afslag {exit_number}",
                        "name": "Ga het knooppunt {rotary_name} op en neem afslag {exit_number} naar {way_name}",
                        "destination": "Ga het knooppunt {rotary_name} op en neem afslag {exit_number} richting {destination}"
    
                    }
                }
            },
            "roundabout": {
                "default": {
                    "exit": {
                        "default": "Ga de rotonde op en neem afslag {exit_number}",
                        "name": "Ga de rotonde op en neem afslag {exit_number} naar {way_name}",
                        "destination": "Ga de rotonde op en neem afslag {exit_number} richting {destination}"
                    },
                    "default": {
                        "default": "Ga de rotonde op",
                        "name": "Verlaat de rotonde naar {way_name}",
                        "destination": "Verlaat de rotonde richting {destination}"
                    }
                }
            },
            "roundabout turn": {
                "default": {
                    "default": "Ga {modifier} op de rotonde",
                    "name": "Ga {modifier} op de rotonde naar {way_name}",
                    "destination": "Ga {modifier} op de rotonde richting {destination}"
                },
                "left": {
                    "default": "Ga links op de rotonde",
                    "name": "Ga links op de rotonde naar {way_name}",
                    "destination": "Ga links op de rotonde richting {destination}"
                },
                "right": {
                    "default": "Ga rechts op de rotonde",
                    "name": "Ga rechts op de rotonde naar {way_name}",
                    "destination": "Ga rechts op de rotonde richting {destination}"
                },
                "straight": {
                    "default": "Rechtdoor op de rotonde",
                    "name": "Rechtdoor op de rotonde naar {way_name}",
                    "destination": "Rechtdoor op de rotonde richting {destination}"
                }
            },
            "turn": {
                "default": {
                    "default": "Ga {modifier}",
                    "name": "Ga {modifier} naar {way_name}",
                    "destination": "Ga {modifier} richting {destination}"
                },
                "left": {
                    "default": "Ga linksaf",
                    "name": "Ga linksaf naar {way_name}",
                    "destination": "Ga linksaf richting {destination}"
                },
                "right": {
                    "default": "Ga rechtsaf",
                    "name": "Ga rechtsaf naar {way_name}",
                    "destination": "Ga rechtsaf richting {destination}"
                },
                "straight": {
                    "default": "Ga rechtdoor",
                    "name": "Ga rechtdoor naar {way_name}",
                    "destination": "Ga rechtdoor richting {destination}"
                }
            },
            "use lane": {
                "no_lanes": {
                    "default": "Rechtdoor"
                },
                "default": {
                    "default": "{lane_instruction} ga {modifier}"
                },
                "straight": {
                    "default": "{lane_instruction}"
                },
                "left": {
                    "default": "{lane_instruction} om links te gaan"
                },
                "right": {
                    "default": "{lane_instruction} om rechts te gaan"
                }
            }
        }
    }
    
    },{}],8:[function(_dereq_,module,exports){
    module.exports={
        "meta": {
            "capitalizeFirstLetter": false
        },
        "v5": {
            "constants": {
                "ordinalize": {
                    "1": "ç¬¬ä¸€",
                    "2": "ç¬¬äºŒ",
                    "3": "ç¬¬ä¸‰",
                    "4": "ç¬¬å››",
                    "5": "ç¬¬äº”",
                    "6": "ç¬¬å…­",
                    "7": "ç¬¬ä¸ƒ",
                    "8": "ç¬¬å…«",
                    "9": "ç¬¬ä¹",
                    "10": "ç¬¬å"
                },
                "direction": {
                    "north": "åŒ—",
                    "northeast": "ä¸œåŒ—",
                    "east": "ä¸œ",
                    "southeast": "ä¸œå—",
                    "south": "å—",
                    "southwest": "è¥¿å—",
                    "west": "è¥¿",
                    "northwest": "è¥¿åŒ—"
                },
                "modifier": {
                    "left": "å‘å·¦",
                    "right": "å‘å³",
                    "sharp left": "å‘å·¦",
                    "sharp right": "å‘å³",
                    "slight left": "å‘å·¦",
                    "slight right": "å‘å³",
                    "straight": "ç›´è¡Œ",
                    "uturn": "è°ƒå¤´"
                },
                "lanes": {
                    "xo": "é å³ç›´è¡Œ",
                    "ox": "é å·¦ç›´è¡Œ",
                    "xox": "ä¿æŒåœ¨é“è·¯ä¸­é—´ç›´è¡Œ",
                    "oxo": "ä¿æŒåœ¨é“è·¯ä¸¤ä¾§ç›´è¡Œ"
                }
            },
            "modes": {
                "ferry": {
                    "default": "ä¹˜åè½®æ¸¡",
                    "name": "ä¹˜å{way_name}è½®æ¸¡",
                    "destination": "ä¹˜åå¼€å¾€{destination}çš„è½®æ¸¡"
                }
            },
            "arrive": {
                "default": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°"
                },
                "left": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å·¦ä¾§"
                },
                "right": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å³ä¾§"
                },
                "sharp left": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å·¦ä¾§"
                },
                "sharp right": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å³ä¾§"
                },
                "slight right": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å³ä¾§"
                },
                "slight left": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨é“è·¯å·¦ä¾§"
                },
                "straight": {
                    "default": "æ‚¨å·²ç»åˆ°è¾¾æ‚¨çš„{nth}ä¸ªç›®çš„åœ°ï¼Œåœ¨æ‚¨æ­£å‰æ–¹"
                }
            },
            "continue": {
                "default": {
                    "default": "ç»§ç»­{modifier}",
                    "name": "ç»§ç»­{modifier}ï¼Œä¸Š{way_name}",
                    "destination": "ç»§ç»­{modifier}è¡Œé©¶ï¼Œå‰å¾€{destination}"
                },
                "uturn": {
                    "default": "è°ƒå¤´",
                    "name": "è°ƒå¤´ä¸Š{way_name}",
                    "destination": "è°ƒå¤´åŽå‰å¾€{destination}"
                }
            },
            "depart": {
                "default": {
                    "default": "å‡ºå‘å‘{direction}",
                    "name": "å‡ºå‘å‘{direction}ï¼Œä¸Š{way_name}"
                }
            },
            "end of road": {
                "default": {
                    "default": "{modifier}è¡Œé©¶",
                    "name": "{modifier}è¡Œé©¶ï¼Œä¸Š{way_name}",
                    "destination": "{modifier}è¡Œé©¶ï¼Œå‰å¾€{destination}"
                },
                "straight": {
                    "default": "ç»§ç»­ç›´è¡Œ",
                    "name": "ç»§ç»­ç›´è¡Œï¼Œä¸Š{way_name}",
                    "destination": "ç»§ç»­ç›´è¡Œï¼Œå‰å¾€{destination}"
                },
                "uturn": {
                    "default": "åœ¨é“è·¯å°½å¤´è°ƒå¤´",
                    "name": "åœ¨é“è·¯å°½å¤´è°ƒå¤´ä¸Š{way_name}",
                    "destination": "åœ¨é“è·¯å°½å¤´è°ƒå¤´ï¼Œå‰å¾€{destination}"
                }
            },
            "fork": {
                "default": {
                    "default": "åœ¨å²”é“ä¿æŒ{modifier}",
                    "name": "åœ¨å²”é“ä¿æŒ{modifier}ï¼Œä¸Š{way_name}",
                    "destination": "åœ¨å²”é“ä¿æŒ{modifier}ï¼Œå‰å¾€{destination}"
                },
                "uturn": {
                    "default": "è°ƒå¤´",
                    "name": "è°ƒå¤´ï¼Œä¸Š{way_name}",
                    "destination": "è°ƒå¤´ï¼Œå‰å¾€{destination}"
                }
            },
            "merge": {
                "default": {
                    "default": "{modifier}å¹¶é“",
                    "name": "{modifier}å¹¶é“ï¼Œä¸Š{way_name}",
                    "destination": "{modifier}å¹¶é“ï¼Œå‰å¾€{destination}"
                },
                "uturn": {
                    "default": "è°ƒå¤´",
                    "name": "è°ƒå¤´ï¼Œä¸Š{way_name}",
                    "destination": "è°ƒå¤´ï¼Œå‰å¾€{destination}"
                }
            },
            "new name": {
                "default": {
                    "default": "ç»§ç»­{modifier}",
                    "name": "ç»§ç»­{modifier}ï¼Œä¸Š{way_name}",
                    "destination": "ç»§ç»­{modifier}ï¼Œå‰å¾€{destination}"
                },
                 "uturn": {
                    "default": "è°ƒå¤´",
                    "name": "è°ƒå¤´ï¼Œä¸Š{way_name}",
                    "destination": "è°ƒå¤´ï¼Œå‰å¾€{destination}"
                }
            },
            "notification": {
                "default": {
                    "default": "ç»§ç»­{modifier}",
                    "name": "ç»§ç»­{modifier}ï¼Œä¸Š{way_name}",
                    "destination" : "ç»§ç»­{modifier}ï¼Œå‰å¾€{destination}"
                },
                "uturn": {
                    "default": "è°ƒå¤´",
                    "name": "è°ƒå¤´ï¼Œä¸Š{way_name}",
                    "destination": "è°ƒå¤´ï¼Œå‰å¾€{destination}"
                }
            },
            "off ramp": {
                "default": {
                    "default": "ä¸ŠåŒé“",
                    "name": "é€šè¿‡åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡åŒé“å‰å¾€{destination}"
                },
                "left": {
                    "default": "é€šè¿‡å·¦è¾¹çš„åŒé“",
                    "name": "é€šè¿‡å·¦è¾¹çš„åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡å·¦è¾¹çš„åŒé“å‰å¾€{destination}"
                },
                "right": {
                    "default": "é€šè¿‡å³è¾¹çš„åŒé“",
                    "name": "é€šè¿‡å³è¾¹çš„åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡å³è¾¹çš„åŒé“å‰å¾€{destination}"
                }
            },
            "on ramp": {
                "default": {
                    "default": "é€šè¿‡åŒé“",
                    "name": "é€šè¿‡åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡åŒé“å‰å¾€{destination}"
                },
                "left": {
                    "default": "é€šè¿‡å·¦è¾¹çš„åŒé“",
                    "name": "é€šè¿‡å·¦è¾¹çš„åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡å·¦è¾¹çš„åŒé“å‰å¾€{destination}"
                },
                "right": {
                    "default": "é€šè¿‡å³è¾¹çš„åŒé“",
                    "name": "é€šè¿‡å³è¾¹çš„åŒé“é©¶å…¥{way_name}",
                    "destination": "é€šè¿‡å³è¾¹çš„åŒé“å‰å¾€{destination}"
                }
            },
            "rotary": {
                "default": {
                    "default": {
                        "default": "è¿›å…¥çŽ¯å²›",
                        "name": "é€šè¿‡çŽ¯å²›åŽé©¶å…¥{way_name}",
                        "destination": "é€šè¿‡çŽ¯å²›å‰å¾€{destination}"
                    },
                    "name": {
                        "default": "è¿›å…¥{rotary_name}çŽ¯å²›",
                        "name": "é€šè¿‡{rotary_name}çŽ¯å²›åŽé©¶å…¥{way_name}",
                        "destination": "é€šè¿‡{rotary_name}çŽ¯å²›åŽå‰å¾€{destination}"
                    },
                    "exit": {
                        "default": "è¿›å…¥çŽ¯å²›å¹¶ä»Ž{exit_number}å‡ºå£é©¶å‡º",
                        "name": "è¿›å…¥çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºè¿›å…¥{way_name}",
                        "destination": "è¿›å…¥çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºå‰å¾€{destination}"
                    },
                    "name_exit": {
                        "default": "è¿›å…¥{rotary_name}çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡º",
                        "name": "è¿›å…¥{rotary_name}çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºè¿›å…¥{way_name}",
                        "destination": "è¿›å…¥{rotary_name}çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºå‰å¾€{destination}"
                    }
                }
            },
            "roundabout": {
                "default": {
                    "exit": {
                        "default": "è¿›å…¥çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡º",
                        "name": "è¿›å…¥çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºå‰å¾€{way_name}",
                        "destination": "è¿›å…¥çŽ¯å²›åŽä»Ž{exit_number}å‡ºå£é©¶å‡ºå‰å¾€{destination}"
                    },
                    "default": {
                        "default": "è¿›å…¥çŽ¯å²›",
                        "name": "é€šè¿‡çŽ¯å²›åŽé©¶å…¥{way_name}",
                        "destination": "é€šè¿‡çŽ¯å²›åŽå‰å¾€{destination}"
                    }
                }
            },
            "roundabout turn": {
                "default": {
                    "default": "åœ¨çŽ¯å²›{modifier}è¡Œé©¶",
                    "name": "åœ¨çŽ¯å²›{modifier}è¡Œé©¶ï¼Œä¸Š{way_name}",
                    "destination": "åœ¨çŽ¯å²›{modifier}è¡Œé©¶ï¼Œå‰å¾€{destination}"
                },
                "left": {
                    "default": "åœ¨çŽ¯å²›å·¦è½¬",
                    "name": "åœ¨çŽ¯å²›å·¦è½¬ï¼Œä¸Š{way_name}",
                    "destination": "åœ¨çŽ¯å²›å·¦è½¬ï¼Œå‰å¾€{destination}"
                },
                "right": {
                    "default": "åœ¨çŽ¯å²›å³è½¬",
                    "name": "åœ¨çŽ¯å²›å³è½¬ï¼Œä¸Š{way_name}",
                    "destination": "åœ¨çŽ¯å²›å³è½¬ï¼Œå‰å¾€{destination}"
                },
                "straight": {
                    "default": "åœ¨çŽ¯å²›ç»§ç»­ç›´è¡Œ",
                    "name": "åœ¨çŽ¯å²›ç»§ç»­ç›´è¡Œï¼Œä¸Š{way_name}",
                    "destination": "åœ¨çŽ¯å²›ç»§ç»­ç›´è¡Œï¼Œå‰å¾€{destination}"
                }
            },
            "turn": {
                "default": {
                    "default": "{modifier}è½¬å¼¯",
                    "name": "{modifier}è½¬å¼¯ï¼Œä¸Š{way_name}",
                    "destination": "{modifier}è½¬å¼¯ï¼Œå‰å¾€{destination}"
                },
                "left": {
                    "default": "å·¦è½¬",
                    "name": "å·¦è½¬ï¼Œä¸Š{way_name}",
                    "destination": "å·¦è½¬ï¼Œå‰å¾€{destination}"
                },
                "right": {
                    "default": "å³è½¬",
                    "name": "å³è½¬ï¼Œä¸Š{way_name}",
                    "destination": "å³è½¬ï¼Œå‰å¾€{destination}"
                },
                "straight": {
                    "default": "ç›´è¡Œ",
                    "name": "ç›´è¡Œï¼Œä¸Š{way_name}",
                    "destination": "ç›´è¡Œï¼Œå‰å¾€{destination}"
                }
            },
            "use lane": {
                "no_lanes": {
                    "default": "ç»§ç»­ç›´è¡Œ"
                },
                "default": {
                    "default": "{lane_instruction}ç„¶åŽ{modifier}"
                },
                "straight": {
                    "default": "{lane_instruction}"
                },
                "left": {
                    "default": "{lane_instruction}ç„¶åŽå·¦è½¬"
                },
                "right": {
                    "default": "{lane_instruction}ç„¶åŽå³è½¬"
                }
            }
        }
    }
    
    },{}],9:[function(_dereq_,module,exports){
    'use strict';
    
    /**
     * Based off of [the offical Google document](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
     *
     * Some parts from [this implementation](http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/PolylineEncoder.js)
     * by [Mark McClure](http://facstaff.unca.edu/mcmcclur/)
     *
     * @module polyline
     */
    
    var polyline = {};
    
    function encode(coordinate, factor) {
        coordinate = Math.round(coordinate * factor);
        coordinate <<= 1;
        if (coordinate < 0) {
            coordinate = ~coordinate;
        }
        var output = '';
        while (coordinate >= 0x20) {
            output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
            coordinate >>= 5;
        }
        output += String.fromCharCode(coordinate + 63);
        return output;
    }
    
    /**
     * Decodes to a [latitude, longitude] coordinates array.
     *
     * This is adapted from the implementation in Project-OSRM.
     *
     * @param {String} str
     * @param {Number} precision
     * @returns {Array}
     *
     * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
     */
    polyline.decode = function(str, precision) {
        var index = 0,
            lat = 0,
            lng = 0,
            coordinates = [],
            shift = 0,
            result = 0,
            byte = null,
            latitude_change,
            longitude_change,
            factor = Math.pow(10, precision || 5);
    
        // Coordinates have variable length when encoded, so just keep
        // track of whether we've hit the end of the string. In each
        // loop iteration, a single coordinate is decoded.
        while (index < str.length) {
    
            // Reset shift, result, and byte
            byte = null;
            shift = 0;
            result = 0;
    
            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);
    
            latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    
            shift = result = 0;
    
            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);
    
            longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    
            lat += latitude_change;
            lng += longitude_change;
    
            coordinates.push([lat / factor, lng / factor]);
        }
    
        return coordinates;
    };
    
    /**
     * Encodes the given [latitude, longitude] coordinates array.
     *
     * @param {Array.<Array.<Number>>} coordinates
     * @param {Number} precision
     * @returns {String}
     */
    polyline.encode = function(coordinates, precision) {
        if (!coordinates.length) { return ''; }
    
        var factor = Math.pow(10, precision || 5),
            output = encode(coordinates[0][0], factor) + encode(coordinates[0][1], factor);
    
        for (var i = 1; i < coordinates.length; i++) {
            var a = coordinates[i], b = coordinates[i - 1];
            output += encode(a[0] - b[0], factor);
            output += encode(a[1] - b[1], factor);
        }
    
        return output;
    };
    
    function flipped(coords) {
        var flipped = [];
        for (var i = 0; i < coords.length; i++) {
            flipped.push(coords[i].slice().reverse());
        }
        return flipped;
    }
    
    /**
     * Encodes a GeoJSON LineString feature/geometry.
     *
     * @param {Object} geojson
     * @param {Number} precision
     * @returns {String}
     */
    polyline.fromGeoJSON = function(geojson, precision) {
        if (geojson && geojson.type === 'Feature') {
            geojson = geojson.geometry;
        }
        if (!geojson || geojson.type !== 'LineString') {
            throw new Error('Input must be a GeoJSON LineString');
        }
        return polyline.encode(flipped(geojson.coordinates), precision);
    };
    
    /**
     * Decodes to a GeoJSON LineString geometry.
     *
     * @param {String} str
     * @param {Number} precision
     * @returns {Object}
     */
    polyline.toGeoJSON = function(str, precision) {
        var coords = polyline.decode(str, precision);
        return {
            type: 'LineString',
            coordinates: flipped(coords)
        };
    };
    
    if (typeof module === 'object' && module.exports) {
        module.exports = polyline;
    }
    
    },{}],10:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        module.exports = L.Class.extend({
            options: {
                timeout: 500,
                blurTimeout: 100,
                noResultsMessage: 'No results found.'
            },
    
            initialize: function(elem, callback, context, options) {
                L.setOptions(this, options);
    
                this._elem = elem;
                this._resultFn = options.resultFn ? L.Util.bind(options.resultFn, options.resultContext) : null;
                this._autocomplete = options.autocompleteFn ? L.Util.bind(options.autocompleteFn, options.autocompleteContext) : null;
                this._selectFn = L.Util.bind(callback, context);
                this._container = L.DomUtil.create('div', 'leaflet-routing-geocoder-result');
                this._resultTable = L.DomUtil.create('table', '', this._container);
    
                // TODO: looks a bit like a kludge to register same for input and keypress -
                // browsers supporting both will get duplicate events; just registering
                // input will not catch enter, though.
                L.DomEvent.addListener(this._elem, 'input', this._keyPressed, this);
                L.DomEvent.addListener(this._elem, 'keypress', this._keyPressed, this);
                L.DomEvent.addListener(this._elem, 'keydown', this._keyDown, this);
                L.DomEvent.addListener(this._elem, 'blur', function() {
                    if (this._isOpen) {
                        this.close();
                    }
                }, this);
            },
    
            close: function() {
                L.DomUtil.removeClass(this._container, 'leaflet-routing-geocoder-result-open');
                this._isOpen = false;
            },
    
            _open: function() {
                var rect = this._elem.getBoundingClientRect();
                if (!this._container.parentElement) {
                    // See notes section under https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX
                    // This abomination is required to support all flavors of IE
                    var scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset
                        : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                    var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset
                        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                    this._container.style.left = (rect.left + scrollX) + 'px';
                    this._container.style.top = (rect.bottom + scrollY) + 'px';
                    this._container.style.width = (rect.right - rect.left) + 'px';
                    document.body.appendChild(this._container);
                }
    
                L.DomUtil.addClass(this._container, 'leaflet-routing-geocoder-result-open');
                this._isOpen = true;
            },
    
            _setResults: function(results) {
                var i,
                    tr,
                    td,
                    text;
    
                delete this._selection;
                this._results = results;
    
                while (this._resultTable.firstChild) {
                    this._resultTable.removeChild(this._resultTable.firstChild);
                }
    
                for (i = 0; i < results.length; i++) {
                    tr = L.DomUtil.create('tr', '', this._resultTable);
                    tr.setAttribute('data-result-index', i);
                    td = L.DomUtil.create('td', '', tr);
                    text = document.createTextNode(results[i].name);
                    td.appendChild(text);
                    // mousedown + click because:
                    // http://stackoverflow.com/questions/10652852/jquery-fire-click-before-blur-event
                    L.DomEvent.addListener(td, 'mousedown', L.DomEvent.preventDefault);
                    L.DomEvent.addListener(td, 'click', this._createClickListener(results[i]));
                }
    
                if (!i) {
                    tr = L.DomUtil.create('tr', '', this._resultTable);
                    td = L.DomUtil.create('td', 'leaflet-routing-geocoder-no-results', tr);
                    td.innerHTML = this.options.noResultsMessage;
                }
    
                this._open();
    
                if (results.length > 0) {
                    // Select the first entry
                    this._select(1);
                }
            },
    
            _createClickListener: function(r) {
                var resultSelected = this._resultSelected(r);
                return L.bind(function() {
                    this._elem.blur();
                    resultSelected();
                }, this);
            },
    
            _resultSelected: function(r) {
                return L.bind(function() {
                    this.close();
                    this._elem.value = r.name;
                    this._lastCompletedText = r.name;
                    this._selectFn(r);
                }, this);
            },
    
            _keyPressed: function(e) {
                var index;
    
                if (this._isOpen && e.keyCode === 13 && this._selection) {
                    index = parseInt(this._selection.getAttribute('data-result-index'), 10);
                    this._resultSelected(this._results[index])();
                    L.DomEvent.preventDefault(e);
                    return;
                }
    
                if (e.keyCode === 13) {
                    this._complete(this._resultFn, true);
                    return;
                }
    
                if (this._autocomplete && document.activeElement === this._elem) {
                    if (this._timer) {
                        clearTimeout(this._timer);
                    }
                    this._timer = setTimeout(L.Util.bind(function() { this._complete(this._autocomplete); }, this),
                        this.options.timeout);
                    return;
                }
    
                this._unselect();
            },
    
            _select: function(dir) {
                var sel = this._selection;
                if (sel) {
                    L.DomUtil.removeClass(sel.firstChild, 'leaflet-routing-geocoder-selected');
                    sel = sel[dir > 0 ? 'nextSibling' : 'previousSibling'];
                }
                if (!sel) {
                    sel = this._resultTable[dir > 0 ? 'firstChild' : 'lastChild'];
                }
    
                if (sel) {
                    L.DomUtil.addClass(sel.firstChild, 'leaflet-routing-geocoder-selected');
                    this._selection = sel;
                }
            },
    
            _unselect: function() {
                if (this._selection) {
                    L.DomUtil.removeClass(this._selection.firstChild, 'leaflet-routing-geocoder-selected');
                }
                delete this._selection;
            },
    
            _keyDown: function(e) {
                if (this._isOpen) {
                    switch (e.keyCode) {
                    // Escape
                    case 27:
                        this.close();
                        L.DomEvent.preventDefault(e);
                        return;
                    // Up
                    case 38:
                        this._select(-1);
                        L.DomEvent.preventDefault(e);
                        return;
                    // Down
                    case 40:
                        this._select(1);
                        L.DomEvent.preventDefault(e);
                        return;
                    }
                }
            },
    
            _complete: function(completeFn, trySelect) {
                var v = this._elem.value;
                function completeResults(results) {
                    this._lastCompletedText = v;
                    if (trySelect && results.length === 1) {
                        this._resultSelected(results[0])();
                    } else {
                        this._setResults(results);
                    }
                }
    
                if (!v) {
                    return;
                }
    
                if (v !== this._lastCompletedText) {
                    completeFn(v, completeResults, this);
                } else if (trySelect) {
                    completeResults.call(this, this._results);
                }
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],11:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        var Itinerary = _dereq_('./itinerary');
        var Line = _dereq_('./line');
        var Plan = _dereq_('./plan');
        var OSRMv1 = _dereq_('./osrm-v1');
    
        module.exports = Itinerary.extend({
            options: {
                fitSelectedRoutes: 'smart',
                routeLine: function(route, options) { return new Line(route, options); },
                autoRoute: true,
                routeWhileDragging: false,
                routeDragInterval: 500,
                waypointMode: 'connect',
                showAlternatives: false,
                defaultErrorHandler: function(e) {
                    console.error('Routing error:', e.error);
                }
            },
    
            initialize: function(options) {
                L.Util.setOptions(this, options);
    
                this._router = this.options.router || new OSRMv1(options);
                this._plan = this.options.plan || new Plan(this.options.waypoints, options);
                this._requestCount = 0;
    
                Itinerary.prototype.initialize.call(this, options);
    
                this.on('routeselected', this._routeSelected, this);
                if (this.options.defaultErrorHandler) {
                    this.on('routingerror', this.options.defaultErrorHandler);
                }
                this._plan.on('waypointschanged', this._onWaypointsChanged, this);
                if (options.routeWhileDragging) {
                    this._setupRouteDragging();
                }
    
                if (this.options.autoRoute) {
                    this.route();
                }
            },
    
            _onZoomEnd: function() {
                if (!this._selectedRoute ||
                    !this._router.requiresMoreDetail) {
                    return;
                }
    
                var map = this._map;
                if (this._router.requiresMoreDetail(this._selectedRoute,
                        map.getZoom(), map.getBounds())) {
                    this.route({
                        callback: L.bind(function(err, routes) {
                            var i;
                            if (!err) {
                                for (i = 0; i < routes.length; i++) {
                                    this._routes[i].properties = routes[i].properties;
                                }
                                this._updateLineCallback(err, routes);
                            }
    
                        }, this),
                        simplifyGeometry: false,
                        geometryOnly: true
                    });
                }
            },
    
            onAdd: function(map) {
                var container = Itinerary.prototype.onAdd.call(this, map);
    
                this._map = map;
                this._map.addLayer(this._plan);
    
                this._map.on('zoomend', this._onZoomEnd, this);
    
                if (this._plan.options.geocoder) {
                    container.insertBefore(this._plan.createGeocoders(), container.firstChild);
                }
    
                return container;
            },
    
            onRemove: function(map) {
                map.off('zoomend', this._onZoomEnd, this);
                if (this._line) {
                    map.removeLayer(this._line);
                }
                map.removeLayer(this._plan);
                if (this._alternatives && this._alternatives.length > 0) {
                    for (var i = 0, len = this._alternatives.length; i < len; i++) {
                        map.removeLayer(this._alternatives[i]);
                    }
                }
                return Itinerary.prototype.onRemove.call(this, map);
            },
    
            getWaypoints: function() {
                return this._plan.getWaypoints();
            },
    
            setWaypoints: function(waypoints) {
                this._plan.setWaypoints(waypoints);
                return this;
            },
    
            spliceWaypoints: function() {
                var removed = this._plan.spliceWaypoints.apply(this._plan, arguments);
                return removed;
            },
    
            getPlan: function() {
                return this._plan;
            },
    
            getRouter: function() {
                return this._router;
            },
    
            _routeSelected: function(e) {
                var route = this._selectedRoute = e.route,
                    alternatives = this.options.showAlternatives && e.alternatives,
                    fitMode = this.options.fitSelectedRoutes,
                    fitBounds =
                        (fitMode === 'smart' && !this._waypointsVisible()) ||
                        (fitMode !== 'smart' && fitMode);
    
                this._updateLines({route: route, alternatives: alternatives});
    
                if (fitBounds) {
                    this._map.fitBounds(this._line.getBounds());
                }
    
                if (this.options.waypointMode === 'snap') {
                    this._plan.off('waypointschanged', this._onWaypointsChanged, this);
                    this.setWaypoints(route.waypoints);
                    this._plan.on('waypointschanged', this._onWaypointsChanged, this);
                }
            },
    
            _waypointsVisible: function() {
                var wps = this.getWaypoints(),
                    mapSize,
                    bounds,
                    boundsSize,
                    i,
                    p;
    
                try {
                    mapSize = this._map.getSize();
    
                    for (i = 0; i < wps.length; i++) {
                        p = this._map.latLngToLayerPoint(wps[i].latLng);
    
                        if (bounds) {
                            bounds.extend(p);
                        } else {
                            bounds = L.bounds([p]);
                        }
                    }
    
                    boundsSize = bounds.getSize();
                    return (boundsSize.x > mapSize.x / 5 ||
                        boundsSize.y > mapSize.y / 5) && this._waypointsInViewport();
    
                } catch (e) {
                    return false;
                }
            },
    
            _waypointsInViewport: function() {
                var wps = this.getWaypoints(),
                    mapBounds,
                    i;
    
                try {
                    mapBounds = this._map.getBounds();
                } catch (e) {
                    return false;
                }
    
                for (i = 0; i < wps.length; i++) {
                    if (mapBounds.contains(wps[i].latLng)) {
                        return true;
                    }
                }
    
                return false;
            },
    
            _updateLines: function(routes) {
                var addWaypoints = this.options.addWaypoints !== undefined ?
                    this.options.addWaypoints : true;
                this._clearLines();
    
                // add alternatives first so they lie below the main route
                this._alternatives = [];
                if (routes.alternatives) routes.alternatives.forEach(function(alt, i) {
                    this._alternatives[i] = this.options.routeLine(alt,
                        L.extend({
                            isAlternative: true
                        }, this.options.altLineOptions || this.options.lineOptions));
                    this._alternatives[i].addTo(this._map);
                    this._hookAltEvents(this._alternatives[i]);
                }, this);
    
                this._line = this.options.routeLine(routes.route,
                    L.extend({
                        addWaypoints: addWaypoints,
                        extendToWaypoints: this.options.waypointMode === 'connect'
                    }, this.options.lineOptions));
                this._line.addTo(this._map);
                this._hookEvents(this._line);
            },
    
            _hookEvents: function(l) {
                l.on('linetouched', function(e) {
                    this._plan.dragNewWaypoint(e);
                }, this);
            },
    
            _hookAltEvents: function(l) {
                l.on('linetouched', function(e) {
                    var alts = this._routes.slice();
                    var selected = alts.splice(e.target._route.routesIndex, 1)[0];
                    this.fire('routeselected', {route: selected, alternatives: alts});
                }, this);
            },
    
            _onWaypointsChanged: function(e) {
                if (this.options.autoRoute) {
                    this.route({});
                }
                if (!this._plan.isReady()) {
                    this._clearLines();
                    this._clearAlts();
                }
                this.fire('waypointschanged', {waypoints: e.waypoints});
            },
    
            _setupRouteDragging: function() {
                var timer = 0,
                    waypoints;
    
                this._plan.on('waypointdrag', L.bind(function(e) {
                    waypoints = e.waypoints;
    
                    if (!timer) {
                        timer = setTimeout(L.bind(function() {
                            this.route({
                                waypoints: waypoints,
                                geometryOnly: true,
                                callback: L.bind(this._updateLineCallback, this)
                            });
                            timer = undefined;
                        }, this), this.options.routeDragInterval);
                    }
                }, this));
                this._plan.on('waypointdragend', function() {
                    if (timer) {
                        clearTimeout(timer);
                        timer = undefined;
                    }
                    this.route();
                }, this);
            },
    
            _updateLineCallback: function(err, routes) {
                if (!err) {
                    routes = routes.slice();
                    var selected = routes.splice(this._selectedRoute.routesIndex, 1)[0];
                    this._updateLines({route: selected, alternatives: routes });
                } else if (err.type !== 'abort') {
                    this._clearLines();
                }
            },
    
            route: function(options) {
                var ts = ++this._requestCount,
                    wps;
    
                if (this._pendingRequest && this._pendingRequest.abort) {
                    this._pendingRequest.abort();
                    this._pendingRequest = null;
                }
    
                options = options || {};
    
                if (this._plan.isReady()) {
                    if (this.options.useZoomParameter) {
                        options.z = this._map && this._map.getZoom();
                    }
    
                    wps = options && options.waypoints || this._plan.getWaypoints();
                    this.fire('routingstart', {waypoints: wps});
                    this._pendingRequest = this._router.route(wps, function(err, routes) {
                        this._pendingRequest = null;
    
                        if (options.callback) {
                            return options.callback.call(this, err, routes);
                        }
    
                        // Prevent race among multiple requests,
                        // by checking the current request's count
                        // against the last request's; ignore result if
                        // this isn't the last request.
                        if (ts === this._requestCount) {
                            this._clearLines();
                            this._clearAlts();
                            if (err && err.type !== 'abort') {
                                this.fire('routingerror', {error: err});
                                return;
                            }
    
                            routes.forEach(function(route, i) { route.routesIndex = i; });
    
                            if (!options.geometryOnly) {
                                this.fire('routesfound', {waypoints: wps, routes: routes});
                                this.setAlternatives(routes);
                            } else {
                                var selectedRoute = routes.splice(0,1)[0];
                                this._routeSelected({route: selectedRoute, alternatives: routes});
                            }
                        }
                    }, this, options);
                }
            },
    
            _clearLines: function() {
                if (this._line) {
                    this._map.removeLayer(this._line);
                    delete this._line;
                }
                if (this._alternatives && this._alternatives.length) {
                    for (var i in this._alternatives) {
                        this._map.removeLayer(this._alternatives[i]);
                    }
                    this._alternatives = [];
                }
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./itinerary":17,"./line":18,"./osrm-v1":21,"./plan":22}],12:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        module.exports = L.Control.extend({
            options: {
                header: 'Routing error',
                formatMessage: function(error) {
                    if (error.status < 0) {
                        return 'Calculating the route caused an error. Technical description follows: <code><pre>' +
                            error.message + '</pre></code';
                    } else {
                        return 'The route could not be calculated. ' +
                            error.message;
                    }
                }
            },
    
            initialize: function(routingControl, options) {
                L.Control.prototype.initialize.call(this, options);
                routingControl
                    .on('routingerror', L.bind(function(e) {
                        if (this._element) {
                            this._element.children[1].innerHTML = this.options.formatMessage(e.error);
                            this._element.style.visibility = 'visible';
                        }
                    }, this))
                    .on('routingstart', L.bind(function() {
                        if (this._element) {
                            this._element.style.visibility = 'hidden';
                        }
                    }, this));
            },
    
            onAdd: function() {
                var header,
                    message;
    
                this._element = L.DomUtil.create('div', 'leaflet-bar leaflet-routing-error');
                this._element.style.visibility = 'hidden';
    
                header = L.DomUtil.create('h3', null, this._element);
                message = L.DomUtil.create('span', null, this._element);
    
                header.innerHTML = this.options.header;
    
                return this._element;
            },
    
            onRemove: function() {
                delete this._element;
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],13:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        var Localization = _dereq_('./localization');
    
        module.exports = L.Class.extend({
            options: {
                units: 'metric',
                unitNames: null,
                language: 'en',
                roundingSensitivity: 1,
                distanceTemplate: '{value} {unit}'
            },
    
            initialize: function(options) {
                L.setOptions(this, options);
    
                var langs = L.Util.isArray(this.options.language) ?
                    this.options.language :
                    [this.options.language, 'en'];
                this._localization = new Localization(langs);
            },
    
            formatDistance: function(d /* Number (meters) */, sensitivity) {
                var un = this.options.unitNames || this._localization.localize('units'),
                    simpleRounding = sensitivity <= 0,
                    round = simpleRounding ? function(v) { return v; } : L.bind(this._round, this),
                    v,
                    yards,
                    data,
                    pow10;
    
                if (this.options.units === 'imperial') {
                    yards = d / 0.9144;
                    if (yards >= 1000) {
                        data = {
                            value: round(d / 1609.344, sensitivity),
                            unit: un.miles
                        };
                    } else {
                        data = {
                            value: round(yards, sensitivity),
                            unit: un.yards
                        };
                    }
                } else {
                    v = round(d, sensitivity);
                    data = {
                        value: v >= 1000 ? (v / 1000) : v,
                        unit: v >= 1000 ? un.kilometers : un.meters
                    };
                }
    
                if (simpleRounding) {
                    data.value = data.value.toFixed(-sensitivity);
                }
    
                return L.Util.template(this.options.distanceTemplate, data);
            },
    
            _round: function(d, sensitivity) {
                var s = sensitivity || this.options.roundingSensitivity,
                    pow10 = Math.pow(10, (Math.floor(d / s) + '').length - 1),
                    r = Math.floor(d / pow10),
                    p = (r > 5) ? pow10 : pow10 / 2;
    
                return Math.round(d / p) * p;
            },
    
            formatTime: function(t /* Number (seconds) */) {
                var un = this.options.unitNames || this._localization.localize('units');
                // More than 30 seconds precision looks ridiculous
                t = Math.round(t / 30) * 30;
    
                if (t > 86400) {
                    return Math.round(t / 3600) + ' ' + un.hours;
                } else if (t > 3600) {
                    return Math.floor(t / 3600) + ' ' + un.hours + ' ' +
                        Math.round((t % 3600) / 60) + ' ' + un.minutes;
                } else if (t > 300) {
                    return Math.round(t / 60) + ' ' + un.minutes;
                } else if (t > 60) {
                    return Math.floor(t / 60) + ' ' + un.minutes +
                        (t % 60 !== 0 ? ' ' + (t % 60) + ' ' + un.seconds : '');
                } else {
                    return t + ' ' + un.seconds;
                }
            },
    
            formatInstruction: function(instr, i) {
                if (instr.text === undefined) {
                    return this.capitalize(L.Util.template(this._getInstructionTemplate(instr, i),
                        L.extend({}, instr, {
                            exitStr: instr.exit ? this._localization.localize('formatOrder')(instr.exit) : '',
                            dir: this._localization.localize(['directions', instr.direction]),
                            modifier: this._localization.localize(['directions', instr.modifier])
                        })));
                } else {
                    return instr.text;
                }
            },
    
            getIconName: function(instr, i) {
                switch (instr.type) {
                case 'Head':
                    if (i === 0) {
                        return 'depart';
                    }
                    break;
                case 'WaypointReached':
                    return 'via';
                case 'Roundabout':
                    return 'enter-roundabout';
                case 'DestinationReached':
                    return 'arrive';
                }
    
                switch (instr.modifier) {
                case 'Straight':
                    return 'continue';
                case 'SlightRight':
                    return 'bear-right';
                case 'Right':
                    return 'turn-right';
                case 'SharpRight':
                    return 'sharp-right';
                case 'TurnAround':
                case 'Uturn':
                    return 'u-turn';
                case 'SharpLeft':
                    return 'sharp-left';
                case 'Left':
                    return 'turn-left';
                case 'SlightLeft':
                    return 'bear-left';
                }
            },
    
            capitalize: function(s) {
                return s.charAt(0).toUpperCase() + s.substring(1);
            },
    
            _getInstructionTemplate: function(instr, i) {
                var type = instr.type === 'Straight' ? (i === 0 ? 'Head' : 'Continue') : instr.type,
                    strings = this._localization.localize(['instructions', type]);
    
                if (!strings) {
                    strings = [
                        this._localization.localize(['directions', type]),
                        ' ' + this._localization.localize(['instructions', 'Onto'])
                    ];
                }
    
                return strings[0] + (strings.length > 1 && instr.road ? strings[1] : '');
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./localization":19}],14:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
        var Autocomplete = _dereq_('./autocomplete');
        var Localization = _dereq_('./localization');
    
        function selectInputText(input) {
            if (input.setSelectionRange) {
                // On iOS, select() doesn't work
                input.setSelectionRange(0, 9999);
            } else {
                // On at least IE8, setSeleectionRange doesn't exist
                input.select();
            }
        }
    
        module.exports = L.Class.extend({
            includes: L.Mixin.Events,
    
            options: {
                createGeocoder: function(i, nWps, options) {
                    var container = L.DomUtil.create('div', 'leaflet-routing-geocoder'),
                        input = L.DomUtil.create('input', '', container),
                        remove = options.addWaypoints ? L.DomUtil.create('span', 'leaflet-routing-remove-waypoint', container) : undefined;
    
                    input.disabled = !options.addWaypoints;
    
                    return {
                        container: container,
                        input: input,
                        closeButton: remove
                    };
                },
                geocoderPlaceholder: function(i, numberWaypoints, geocoderElement) {
                    var l = new Localization(geocoderElement.options.language).localize('ui');
                    return i === 0 ?
                        l.startPlaceholder :
                        (i < numberWaypoints - 1 ?
                            L.Util.template(l.viaPlaceholder, {viaNumber: i}) :
                            l.endPlaceholder);
                },
    
                geocoderClass: function() {
                    return '';
                },
    
                waypointNameFallback: function(latLng) {
                    var ns = latLng.lat < 0 ? 'S' : 'N',
                        ew = latLng.lng < 0 ? 'W' : 'E',
                        lat = (Math.round(Math.abs(latLng.lat) * 10000) / 10000).toString(),
                        lng = (Math.round(Math.abs(latLng.lng) * 10000) / 10000).toString();
                    return ns + lat + ', ' + ew + lng;
                },
                maxGeocoderTolerance: 200,
                autocompleteOptions: {},
                language: 'en',
            },
    
            initialize: function(wp, i, nWps, options) {
                L.setOptions(this, options);
    
                var g = this.options.createGeocoder(i, nWps, this.options),
                    closeButton = g.closeButton,
                    geocoderInput = g.input;
                geocoderInput.setAttribute('placeholder', this.options.geocoderPlaceholder(i, nWps, this));
                geocoderInput.className = this.options.geocoderClass(i, nWps);
    
                this._element = g;
                this._waypoint = wp;
    
                this.update();
                // This has to be here, or geocoder's value will not be properly
                // initialized.
                // TODO: look into why and make _updateWaypointName fix this.
                geocoderInput.value = wp.name;
    
                L.DomEvent.addListener(geocoderInput, 'click', function() {
                    selectInputText(this);
                }, geocoderInput);
    
                if (closeButton) {
                    L.DomEvent.addListener(closeButton, 'click', function() {
                        this.fire('delete', { waypoint: this._waypoint });
                    }, this);
                }
    
                new Autocomplete(geocoderInput, function(r) {
                        geocoderInput.value = r.name;
                        wp.name = r.name;
                        wp.latLng = r.center;
                        this.fire('geocoded', { waypoint: wp, value: r });
                    }, this, L.extend({
                        resultFn: this.options.geocoder.geocode,
                        resultContext: this.options.geocoder,
                        autocompleteFn: this.options.geocoder.suggest,
                        autocompleteContext: this.options.geocoder
                    }, this.options.autocompleteOptions));
            },
    
            getContainer: function() {
                return this._element.container;
            },
    
            setValue: function(v) {
                this._element.input.value = v;
            },
    
            update: function(force) {
                var wp = this._waypoint,
                    wpCoords;
    
                wp.name = wp.name || '';
    
                if (wp.latLng && (force || !wp.name)) {
                    wpCoords = this.options.waypointNameFallback(wp.latLng);
                    if (this.options.geocoder && this.options.geocoder.reverse) {
                        this.options.geocoder.reverse(wp.latLng, 67108864 /* zoom 18 */, function(rs) {
                            if (rs.length > 0 && rs[0].center.distanceTo(wp.latLng) < this.options.maxGeocoderTolerance) {
                                wp.name = rs[0].name;
                            } else {
                                wp.name = wpCoords;
                            }
                            this._update();
                        }, this);
                    } else {
                        wp.name = wpCoords;
                        this._update();
                    }
                }
            },
    
            focus: function() {
                var input = this._element.input;
                input.focus();
                selectInputText(input);
            },
    
            _update: function() {
                var wp = this._waypoint,
                    value = wp && wp.name ? wp.name : '';
                this.setValue(value);
                this.fire('reversegeocoded', {waypoint: wp, value: value});
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./autocomplete":10,"./localization":19}],15:[function(_dereq_,module,exports){
    (function (global){
    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null),
        Control = _dereq_('./control'),
        Itinerary = _dereq_('./itinerary'),
        Line = _dereq_('./line'),
        OSRMv1 = _dereq_('./osrm-v1'),
        Plan = _dereq_('./plan'),
        Waypoint = _dereq_('./waypoint'),
        Autocomplete = _dereq_('./autocomplete'),
        Formatter = _dereq_('./formatter'),
        GeocoderElement = _dereq_('./geocoder-element'),
        Localization = _dereq_('./localization'),
        ItineraryBuilder = _dereq_('./itinerary-builder'),
        Mapbox = _dereq_('./mapbox'),
        ErrorControl = _dereq_('./error-control');
    
    L.routing = {
        control: function(options) { return new Control(options); },
        itinerary: function(options) {
            return Itinerary(options);
        },
        line: function(route, options) {
            return new Line(route, options);
        },
        plan: function(waypoints, options) {
            return new Plan(waypoints, options);
        },
        waypoint: function(latLng, name, options) {
            return new Waypoint(latLng, name, options);
        },
        osrmv1: function(options) {
            return new OSRMv1(options);
        },
        localization: function(options) {
            return new Localization(options);
        },
        formatter: function(options) {
            return new Formatter(options);
        },
        geocoderElement: function(wp, i, nWps, plan) {
            return new L.Routing.GeocoderElement(wp, i, nWps, plan);
        },
        itineraryBuilder: function(options) {
            return new ItineraryBuilder(options);
        },
        mapbox: function(accessToken, options) {
            return new Mapbox(accessToken, options);
        },
        errorControl: function(routingControl, options) {
            return new ErrorControl(routingControl, options);
        },
        autocomplete: function(elem, callback, context, options) {
            return new Autocomplete(elem, callback, context, options);
        }
    };
    
    module.exports = L.Routing = {
        Control: Control,
        Itinerary: Itinerary,
        Line: Line,
        OSRMv1: OSRMv1,
        Plan: Plan,
        Waypoint: Waypoint,
        Autocomplete: Autocomplete,
        Formatter: Formatter,
        GeocoderElement: GeocoderElement,
        Localization: Localization,
        Formatter: Formatter,
        ItineraryBuilder: ItineraryBuilder,
    
        // Legacy; remove these in next major release
        control: L.routing.control,
        itinerary: L.routing.itinerary,
        line: L.routing.line,
        plan: L.routing.plan,
        waypoint: L.routing.waypoint,
        osrmv1: L.routing.osrmv1,
        geocoderElement: L.routing.geocoderElement,
        mapbox: L.routing.mapbox,
        errorControl: L.routing.errorControl,
    };
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./autocomplete":10,"./control":11,"./error-control":12,"./formatter":13,"./geocoder-element":14,"./itinerary":17,"./itinerary-builder":16,"./line":18,"./localization":19,"./mapbox":20,"./osrm-v1":21,"./plan":22,"./waypoint":23}],16:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        module.exports = L.Class.extend({
            options: {
                containerClassName: ''
            },
    
            initialize: function(options) {
                L.setOptions(this, options);
            },
    
            createContainer: function(className) {
                var table = L.DomUtil.create('table', className || ''),
                    colgroup = L.DomUtil.create('colgroup', '', table);
    
                L.DomUtil.create('col', 'leaflet-routing-instruction-icon', colgroup);
                L.DomUtil.create('col', 'leaflet-routing-instruction-text', colgroup);
                L.DomUtil.create('col', 'leaflet-routing-instruction-distance', colgroup);
    
                return table;
            },
    
            createStepsContainer: function() {
                return L.DomUtil.create('tbody', '');
            },
    
            createStep: function(text, distance, icon, steps) {
                var row = L.DomUtil.create('tr', '', steps),
                    span,
                    td;
                td = L.DomUtil.create('td', '', row);
                span = L.DomUtil.create('span', 'leaflet-routing-icon leaflet-routing-icon-'+icon, td);
                td.appendChild(span);
                td = L.DomUtil.create('td', '', row);
                td.appendChild(document.createTextNode(text));
                td = L.DomUtil.create('td', '', row);
                td.appendChild(document.createTextNode(distance));
                return row;
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],17:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
        var Formatter = _dereq_('./formatter');
        var ItineraryBuilder = _dereq_('./itinerary-builder');
    
        module.exports = L.Control.extend({
            includes: L.Mixin.Events,
    
            options: {
                pointMarkerStyle: {
                    radius: 5,
                    color: '#03f',
                    fillColor: 'white',
                    opacity: 1,
                    fillOpacity: 0.7
                },
                summaryTemplate: '<h2>{name}</h2><h3>{distance}, {time}</h3>',
                timeTemplate: '{time}',
                containerClassName: '',
                alternativeClassName: '',
                minimizedClassName: '',
                itineraryClassName: '',
                totalDistanceRoundingSensitivity: -1,
                show: true,
                collapsible: undefined,
                collapseBtn: function(itinerary) {
                    var collapseBtn = L.DomUtil.create('span', itinerary.options.collapseBtnClass);
                    L.DomEvent.on(collapseBtn, 'click', itinerary._toggle, itinerary);
                    itinerary._container.insertBefore(collapseBtn, itinerary._container.firstChild);
                },
                collapseBtnClass: 'leaflet-routing-collapse-btn'
            },
    
            initialize: function(options) {
                L.setOptions(this, options);
                this._formatter = this.options.formatter || new Formatter(this.options);
                this._itineraryBuilder = this.options.itineraryBuilder || new ItineraryBuilder({
                    containerClassName: this.options.itineraryClassName
                });
            },
    
            onAdd: function(map) {
                var collapsible = this.options.collapsible;
    
                collapsible = collapsible || (collapsible === undefined && map.getSize().x <= 640);
    
                this._container = L.DomUtil.create('div', 'leaflet-routing-container leaflet-bar ' +
                    (!this.options.show ? 'leaflet-routing-container-hide ' : '') +
                    (collapsible ? 'leaflet-routing-collapsible ' : '') +
                    this.options.containerClassName);
                this._altContainer = this.createAlternativesContainer();
                this._container.appendChild(this._altContainer);
                L.DomEvent.disableClickPropagation(this._container);
                L.DomEvent.addListener(this._container, 'mousewheel', function(e) {
                    L.DomEvent.stopPropagation(e);
                });
    
                if (collapsible) {
                    this.options.collapseBtn(this);
                }
    
                return this._container;
            },
    
            onRemove: function() {
            },
    
            createAlternativesContainer: function() {
                return L.DomUtil.create('div', 'leaflet-routing-alternatives-container');
            },
    
            setAlternatives: function(routes) {
                var i,
                    alt,
                    altDiv;
    
                this._clearAlts();
    
                this._routes = routes;
    
                for (i = 0; i < this._routes.length; i++) {
                    alt = this._routes[i];
                    altDiv = this._createAlternative(alt, i);
                    this._altContainer.appendChild(altDiv);
                    this._altElements.push(altDiv);
                }
    
                this._selectRoute({route: this._routes[0], alternatives: this._routes.slice(1)});
    
                return this;
            },
    
            show: function() {
                L.DomUtil.removeClass(this._container, 'leaflet-routing-container-hide');
            },
    
            hide: function() {
                L.DomUtil.addClass(this._container, 'leaflet-routing-container-hide');
            },
    
            _toggle: function() {
                var collapsed = L.DomUtil.hasClass(this._container, 'leaflet-routing-container-hide');
                this[collapsed ? 'show' : 'hide']();
            },
    
            _createAlternative: function(alt, i) {
                var altDiv = L.DomUtil.create('div', 'leaflet-routing-alt ' +
                    this.options.alternativeClassName +
                    (i > 0 ? ' leaflet-routing-alt-minimized ' + this.options.minimizedClassName : '')),
                    template = this.options.summaryTemplate,
                    data = L.extend({
                        name: alt.name,
                        distance: this._formatter.formatDistance(alt.summary.totalDistance, this.options.totalDistanceRoundingSensitivity),
                        time: this._formatter.formatTime(alt.summary.totalTime)
                    }, alt);
                altDiv.innerHTML = typeof(template) === 'function' ? template(data) : L.Util.template(template, data);
                L.DomEvent.addListener(altDiv, 'click', this._onAltClicked, this);
                this.on('routeselected', this._selectAlt, this);
    
                altDiv.appendChild(this._createItineraryContainer(alt));
                return altDiv;
            },
    
            _clearAlts: function() {
                var el = this._altContainer;
                while (el && el.firstChild) {
                    el.removeChild(el.firstChild);
                }
    
                this._altElements = [];
            },
    
            _createItineraryContainer: function(r) {
                var container = this._itineraryBuilder.createContainer(),
                    steps = this._itineraryBuilder.createStepsContainer(),
                    i,
                    instr,
                    step,
                    distance,
                    text,
                    icon;
    
                container.appendChild(steps);
    
                for (i = 0; i < r.instructions.length; i++) {
                    instr = r.instructions[i];
                    text = this._formatter.formatInstruction(instr, i);
                    distance = this._formatter.formatDistance(instr.distance);
                    icon = this._formatter.getIconName(instr, i);
                    step = this._itineraryBuilder.createStep(text, distance, icon, steps);
    
                    this._addRowListeners(step, r.coordinates[instr.index]);
                }
    
                return container;
            },
    
            _addRowListeners: function(row, coordinate) {
                L.DomEvent.addListener(row, 'mouseover', function() {
                    this._marker = L.circleMarker(coordinate,
                        this.options.pointMarkerStyle).addTo(this._map);
                }, this);
                L.DomEvent.addListener(row, 'mouseout', function() {
                    if (this._marker) {
                        this._map.removeLayer(this._marker);
                        delete this._marker;
                    }
                }, this);
                L.DomEvent.addListener(row, 'click', function(e) {
                    this._map.panTo(coordinate);
                    L.DomEvent.stopPropagation(e);
                }, this);
            },
    
            _onAltClicked: function(e) {
                var altElem = e.target || window.event.srcElement;
                while (!L.DomUtil.hasClass(altElem, 'leaflet-routing-alt')) {
                    altElem = altElem.parentElement;
                }
    
                var j = this._altElements.indexOf(altElem);
                var alts = this._routes.slice();
                var route = alts.splice(j, 1)[0];
    
                this.fire('routeselected', {
                    route: route,
                    alternatives: alts
                });
            },
    
            _selectAlt: function(e) {
                var altElem,
                    j,
                    n,
                    classFn;
    
                altElem = this._altElements[e.route.routesIndex];
    
                if (L.DomUtil.hasClass(altElem, 'leaflet-routing-alt-minimized')) {
                    for (j = 0; j < this._altElements.length; j++) {
                        n = this._altElements[j];
                        classFn = j === e.route.routesIndex ? 'removeClass' : 'addClass';
                        L.DomUtil[classFn](n, 'leaflet-routing-alt-minimized');
                        if (this.options.minimizedClassName) {
                            L.DomUtil[classFn](n, this.options.minimizedClassName);
                        }
    
                        if (j !== e.route.routesIndex) n.scrollTop = 0;
                    }
                }
    
                L.DomEvent.stop(e);
            },
    
            _selectRoute: function(routes) {
                if (this._marker) {
                    this._map.removeLayer(this._marker);
                    delete this._marker;
                }
                this.fire('routeselected', routes);
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./formatter":13,"./itinerary-builder":16}],18:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
        
        module.exports = L.LayerGroup.extend({
            includes: L.Mixin.Events,
    
            options: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9},
                    {color: 'white', opacity: 0.8, weight: 6},
                    {color: 'red', opacity: 1, weight: 2}
                ],
                missingRouteStyles: [
                    {color: 'black', opacity: 0.15, weight: 7},
                    {color: 'white', opacity: 0.6, weight: 4},
                    {color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12'}
                ],
                addWaypoints: true,
                extendToWaypoints: true,
                missingRouteTolerance: 10
            },
    
            initialize: function(route, options) {
                L.setOptions(this, options);
                L.LayerGroup.prototype.initialize.call(this, options);
                this._route = route;
    
                if (this.options.extendToWaypoints) {
                    this._extendToWaypoints();
                }
    
                this._addSegment(
                    route.coordinates,
                    this.options.styles,
                    this.options.addWaypoints);
            },
            
            getBounds: function() {
                return L.latLngBounds(this._route.coordinates);
            },
    
            _findWaypointIndices: function() {
                var wps = this._route.inputWaypoints,
                    indices = [],
                    i;
                for (i = 0; i < wps.length; i++) {
                    indices.push(this._findClosestRoutePoint(wps[i].latLng));
                }
    
                return indices;
            },
    
            _findClosestRoutePoint: function(latlng) {
                var minDist = Number.MAX_VALUE,
                    minIndex,
                    i,
                    d;
    
                for (i = this._route.coordinates.length - 1; i >= 0 ; i--) {
                    // TODO: maybe do this in pixel space instead?
                    d = latlng.distanceTo(this._route.coordinates[i]);
                    if (d < minDist) {
                        minIndex = i;
                        minDist = d;
                    }
                }
    
                return minIndex;
            },
    
            _extendToWaypoints: function() {
                var wps = this._route.inputWaypoints,
                    wpIndices = this._getWaypointIndices(),
                    i,
                    wpLatLng,
                    routeCoord;
    
                for (i = 0; i < wps.length; i++) {
                    wpLatLng = wps[i].latLng;
                    routeCoord = L.latLng(this._route.coordinates[wpIndices[i]]);
                    if (wpLatLng.distanceTo(routeCoord) >
                        this.options.missingRouteTolerance) {
                        this._addSegment([wpLatLng, routeCoord],
                            this.options.missingRouteStyles);
                    }
                }
            },
    
            _addSegment: function(coords, styles, mouselistener) {
                var i,
                    pl;
    
                for (i = 0; i < styles.length; i++) {
                    pl = L.polyline(coords, styles[i]);
                    this.addLayer(pl);
                    if (mouselistener) {
                        pl.on('mousedown', this._onLineTouched, this);
                    }
                }
            },
    
            _findNearestWpBefore: function(i) {
                var wpIndices = this._getWaypointIndices(),
                    j = wpIndices.length - 1;
                while (j >= 0 && wpIndices[j] > i) {
                    j--;
                }
    
                return j;
            },
    
            _onLineTouched: function(e) {
                var afterIndex = this._findNearestWpBefore(this._findClosestRoutePoint(e.latlng));
                this.fire('linetouched', {
                    afterIndex: afterIndex,
                    latlng: e.latlng
                });
            },
    
            _getWaypointIndices: function() {
                if (!this._wpIndices) {
                    this._wpIndices = this._route.waypointIndices || this._findWaypointIndices();
                }
    
                return this._wpIndices;
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}],19:[function(_dereq_,module,exports){
    (function() {
        'use strict';
    
        var spanish = {
            directions: {
                N: 'norte',
                NE: 'noreste',
                E: 'este',
                SE: 'sureste',
                S: 'sur',
                SW: 'suroeste',
                W: 'oeste',
                NW: 'noroeste',
                SlightRight: 'leve giro a la derecha',
                Right: 'derecha',
                SharpRight: 'giro pronunciado a la derecha',
                SlightLeft: 'leve giro a la izquierda',
                Left: 'izquierda',
                SharpLeft: 'giro pronunciado a la izquierda',
                Uturn: 'media vuelta'
            },
            instructions: {
                // instruction, postfix if the road is named
                'Head':
                    ['Derecho {dir}', ' sobre {road}'],
                'Continue':
                    ['Continuar {dir}', ' en {road}'],
                'TurnAround':
                    ['Dar vuelta'],
                'WaypointReached':
                    ['LlegÃ³ a un punto del camino'],
                'Roundabout':
                    ['Tomar {exitStr} salida en la rotonda', ' en {road}'],
                'DestinationReached':
                    ['Llegada a destino'],
                'Fork': ['En el cruce gira a {modifier}', ' hacia {road}'],
                'Merge': ['IncorpÃ³rate {modifier}', ' hacia {road}'],
                'OnRamp': ['Gira {modifier} en la salida', ' hacia {road}'],
                'OffRamp': ['Toma la salida {modifier}', ' hacia {road}'],
                'EndOfRoad': ['Gira {modifier} al final de la carretera', ' hacia {road}'],
                'Onto': 'hacia {road}'
            },
            formatOrder: function(n) {
                return n + 'Âº';
            },
            ui: {
                startPlaceholder: 'Inicio',
                viaPlaceholder: 'Via {viaNumber}',
                endPlaceholder: 'Destino'
            },
            units: {
                meters: 'm',
                kilometers: 'km',
                yards: 'yd',
                miles: 'mi',
                hours: 'h',
                minutes: 'min',
                seconds: 's'
            }
        };
    
        L.Routing = L.Routing || {};
    
        var Localization = L.Class.extend({
            initialize: function(langs) {
                this._langs = L.Util.isArray(langs) ? langs : [langs, 'en'];
    
                for (var i = 0, l = this._langs.length; i < l; i++) {
                    if (!Localization[this._langs[i]]) {
                        throw new Error('No localization for language "' + this._langs[i] + '".');
                    }
                }
            },
    
            localize: function(keys) {
                var dict,
                    key,
                    value;
    
                keys = L.Util.isArray(keys) ? keys : [keys];
    
                for (var i = 0, l = this._langs.length; i < l; i++) {
                    dict = Localization[this._langs[i]];
                    for (var j = 0, nKeys = keys.length; dict && j < nKeys; j++) {
                        key = keys[j];
                        value = dict[key];
                        dict = value;
                    }
    
                    if (value) {
                        return value;
                    }
                }
            }
        });
    
        module.exports = L.extend(Localization, {
            'en': {
                directions: {
                    N: 'north',
                    NE: 'northeast',
                    E: 'east',
                    SE: 'southeast',
                    S: 'south',
                    SW: 'southwest',
                    W: 'west',
                    NW: 'northwest',
                    SlightRight: 'slight right',
                    Right: 'right',
                    SharpRight: 'sharp right',
                    SlightLeft: 'slight left',
                    Left: 'left',
                    SharpLeft: 'sharp left',
                    Uturn: 'Turn around'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Head {dir}', ' on {road}'],
                    'Continue':
                        ['Continue {dir}'],
                    'TurnAround':
                        ['Turn around'],
                    'WaypointReached':
                        ['Waypoint reached'],
                    'Roundabout':
                        ['Take the {exitStr} exit in the roundabout', ' onto {road}'],
                    'DestinationReached':
                        ['Destination reached'],
                    'Fork': ['At the fork, turn {modifier}', ' onto {road}'],
                    'Merge': ['Merge {modifier}', ' onto {road}'],
                    'OnRamp': ['Turn {modifier} on the ramp', ' onto {road}'],
                    'OffRamp': ['Take the ramp on the {modifier}', ' onto {road}'],
                    'EndOfRoad': ['Turn {modifier} at the end of the road', ' onto {road}'],
                    'Onto': 'onto {road}'
                },
                formatOrder: function(n) {
                    var i = n % 10 - 1,
                    suffix = ['st', 'nd', 'rd'];
    
                    return suffix[i] ? n + suffix[i] : n + 'th';
                },
                ui: {
                    startPlaceholder: 'Start',
                    viaPlaceholder: 'Via {viaNumber}',
                    endPlaceholder: 'End'
                },
                units: {
                    meters: 'm',
                    kilometers: 'km',
                    yards: 'yd',
                    miles: 'mi',
                    hours: 'h',
                    minutes: 'min',
                    seconds: 's'
                }
            },
    
            'de': {
                directions: {
                    N: 'Norden',
                    NE: 'Nordosten',
                    E: 'Osten',
                    SE: 'SÃ¼dosten',
                    S: 'SÃ¼den',
                    SW: 'SÃ¼dwesten',
                    W: 'Westen',
                    NW: 'Nordwesten',
                    SlightRight: 'leicht rechts',
                    Right: 'rechts',
                    SharpRight: 'scharf rechts',
                    SlightLeft: 'leicht links',
                    Left: 'links',
                    SharpLeft: 'scharf links',
                    Uturn: 'Wenden'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Richtung {dir}', ' auf {road}'],
                    'Continue':
                        ['Geradeaus Richtung {dir}', ' auf {road}'],
                    'SlightRight':
                        ['Leicht rechts abbiegen', ' auf {road}'],
                    'Right':
                        ['Rechts abbiegen', ' auf {road}'],
                    'SharpRight':
                        ['Scharf rechts abbiegen', ' auf {road}'],
                    'TurnAround':
                        ['Wenden'],
                    'SharpLeft':
                        ['Scharf links abbiegen', ' auf {road}'],
                    'Left':
                        ['Links abbiegen', ' auf {road}'],
                    'SlightLeft':
                        ['Leicht links abbiegen', ' auf {road}'],
                    'WaypointReached':
                        ['Zwischenhalt erreicht'],
                    'Roundabout':
                        ['Nehmen Sie die {exitStr} Ausfahrt im Kreisverkehr', ' auf {road}'],
                    'DestinationReached':
                        ['Sie haben ihr Ziel erreicht'],
                    'Fork': ['An der Kreuzung {modifier}', ' auf {road}'],
                    'Merge': ['Fahren Sie {modifier} weiter', ' auf {road}'],
                    'OnRamp': ['Fahren Sie {modifier} auf die Auffahrt', ' auf {road}'],
                    'OffRamp': ['Nehmen Sie die Ausfahrt {modifier}', ' auf {road}'],
                    'EndOfRoad': ['Fahren Sie {modifier} am Ende der StraÃŸe', ' auf {road}'],
                    'Onto': 'auf {road}'
                },
                formatOrder: function(n) {
                    return n + '.';
                },
                ui: {
                    startPlaceholder: 'Start',
                    viaPlaceholder: 'Via {viaNumber}',
                    endPlaceholder: 'Ziel'
                }
            },
    
            'sv': {
                directions: {
                    N: 'norr',
                    NE: 'nordost',
                    E: 'Ã¶st',
                    SE: 'sydost',
                    S: 'syd',
                    SW: 'sydvÃ¤st',
                    W: 'vÃ¤st',
                    NW: 'nordvÃ¤st',
                    SlightRight: 'svagt hÃ¶ger',
                    Right: 'hÃ¶ger',
                    SharpRight: 'skarpt hÃ¶ger',
                    SlightLeft: 'svagt vÃ¤nster',
                    Left: 'vÃ¤nster',
                    SharpLeft: 'skarpt vÃ¤nster',
                    Uturn: 'VÃ¤nd'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Ã…k Ã¥t {dir}', ' till {road}'],
                    'Continue':
                        ['FortsÃ¤tt {dir}'],
                    'SlightRight':
                        ['Svagt hÃ¶ger', ' till {road}'],
                    'Right':
                        ['SvÃ¤ng hÃ¶ger', ' till {road}'],
                    'SharpRight':
                        ['Skarpt hÃ¶ger', ' till {road}'],
                    'TurnAround':
                        ['VÃ¤nd'],
                    'SharpLeft':
                        ['Skarpt vÃ¤nster', ' till {road}'],
                    'Left':
                        ['SvÃ¤ng vÃ¤nster', ' till {road}'],
                    'SlightLeft':
                        ['Svagt vÃ¤nster', ' till {road}'],
                    'WaypointReached':
                        ['Viapunkt nÃ¥dd'],
                    'Roundabout':
                        ['Tag {exitStr} avfarten i rondellen', ' till {road}'],
                    'DestinationReached':
                        ['Framme vid resans mÃ¥l'],
                    'Fork': ['Tag av {modifier}', ' till {road}'],
                    'Merge': ['Anslut {modifier} ', ' till {road}'],
                    'OnRamp': ['Tag pÃ¥farten {modifier}', ' till {road}'],
                    'OffRamp': ['Tag avfarten {modifier}', ' till {road}'],
                    'EndOfRoad': ['SvÃ¤ng {modifier} vid vÃ¤gens slut', ' till {road}'],
                    'Onto': 'till {road}'
                },
                formatOrder: function(n) {
                    return ['fÃ¶rsta', 'andra', 'tredje', 'fjÃ¤rde', 'femte',
                        'sjÃ¤tte', 'sjunde', 'Ã¥ttonde', 'nionde', 'tionde'
                        /* Can't possibly be more than ten exits, can there? */][n - 1];
                },
                ui: {
                    startPlaceholder: 'FrÃ¥n',
                    viaPlaceholder: 'Via {viaNumber}',
                    endPlaceholder: 'Till'
                }
            },
    
            'es': spanish,
            'sp': spanish,
            
            'nl': {
                directions: {
                    N: 'noordelijke',
                    NE: 'noordoostelijke',
                    E: 'oostelijke',
                    SE: 'zuidoostelijke',
                    S: 'zuidelijke',
                    SW: 'zuidewestelijke',
                    W: 'westelijke',
                    NW: 'noordwestelijke'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Vertrek in {dir} richting', ' de {road} op'],
                    'Continue':
                        ['Ga in {dir} richting', ' de {road} op'],
                    'SlightRight':
                        ['Volg de weg naar rechts', ' de {road} op'],
                    'Right':
                        ['Ga rechtsaf', ' de {road} op'],
                    'SharpRight':
                        ['Ga scherpe bocht naar rechts', ' de {road} op'],
                    'TurnAround':
                        ['Keer om'],
                    'SharpLeft':
                        ['Ga scherpe bocht naar links', ' de {road} op'],
                    'Left':
                        ['Ga linksaf', ' de {road} op'],
                    'SlightLeft':
                        ['Volg de weg naar links', ' de {road} op'],
                    'WaypointReached':
                        ['Aangekomen bij tussenpunt'],
                    'Roundabout':
                        ['Neem de {exitStr} afslag op de rotonde', ' de {road} op'],
                    'DestinationReached':
                        ['Aangekomen op eindpunt'],
                },
                formatOrder: function(n) {
                    if (n === 1 || n >= 20) {
                        return n + 'ste';
                    } else {
                        return n + 'de';
                    }
                },
                ui: {
                    startPlaceholder: 'Vertrekpunt',
                    viaPlaceholder: 'Via {viaNumber}',
                    endPlaceholder: 'Bestemming'
                }
            },
            'fr': {
                directions: {
                    N: 'nord',
                    NE: 'nord-est',
                    E: 'est',
                    SE: 'sud-est',
                    S: 'sud',
                    SW: 'sud-ouest',
                    W: 'ouest',
                    NW: 'nord-ouest'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Tout droit au {dir}', ' sur {road}'],
                    'Continue':
                        ['Continuer au {dir}', ' sur {road}'],
                    'SlightRight':
                        ['LÃ©gÃ¨rement Ã  droite', ' sur {road}'],
                    'Right':
                        ['A droite', ' sur {road}'],
                    'SharpRight':
                        ['ComplÃ¨tement Ã  droite', ' sur {road}'],
                    'TurnAround':
                        ['Faire demi-tour'],
                    'SharpLeft':
                        ['ComplÃ¨tement Ã  gauche', ' sur {road}'],
                    'Left':
                        ['A gauche', ' sur {road}'],
                    'SlightLeft':
                        ['LÃ©gÃ¨rement Ã  gauche', ' sur {road}'],
                    'WaypointReached':
                        ['Point d\'Ã©tape atteint'],
                    'Roundabout':
                        ['Au rond-point, prenez la {exitStr} sortie', ' sur {road}'],
                    'DestinationReached':
                        ['Destination atteinte'],
                },
                formatOrder: function(n) {
                    return n + 'Âº';
                },
                ui: {
                    startPlaceholder: 'DÃ©part',
                    viaPlaceholder: 'IntermÃ©diaire {viaNumber}',
                    endPlaceholder: 'ArrivÃ©e'
                }
            },
            'it': {
                directions: {
                    N: 'nord',
                    NE: 'nord-est',
                    E: 'est',
                    SE: 'sud-est',
                    S: 'sud',
                    SW: 'sud-ovest',
                    W: 'ovest',
                    NW: 'nord-ovest'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Dritto verso {dir}', ' su {road}'],
                    'Continue':
                        ['Continuare verso {dir}', ' su {road}'],
                    'SlightRight':
                        ['Mantenere la destra', ' su {road}'],
                    'Right':
                        ['A destra', ' su {road}'],
                    'SharpRight':
                        ['Strettamente a destra', ' su {road}'],
                    'TurnAround':
                        ['Fare inversione di marcia'],
                    'SharpLeft':
                        ['Strettamente a sinistra', ' su {road}'],
                    'Left':
                        ['A sinistra', ' sur {road}'],
                    'SlightLeft':
                        ['Mantenere la sinistra', ' su {road}'],
                    'WaypointReached':
                        ['Punto di passaggio raggiunto'],
                    'Roundabout':
                        ['Alla rotonda, prendere la {exitStr} uscita'],
                    'DestinationReached':
                        ['Destinazione raggiunta'],
                },
                formatOrder: function(n) {
                    return n + 'Âº';
                },
                ui: {
                    startPlaceholder: 'Partenza',
                    viaPlaceholder: 'Intermedia {viaNumber}',
                    endPlaceholder: 'Destinazione'
                }
            },
            'pt': {
                directions: {
                    N: 'norte',
                    NE: 'nordeste',
                    E: 'leste',
                    SE: 'sudeste',
                    S: 'sul',
                    SW: 'sudoeste',
                    W: 'oeste',
                    NW: 'noroeste',
                    SlightRight: 'curva ligeira a direita',
                    Right: 'direita',
                    SharpRight: 'curva fechada a direita',
                    SlightLeft: 'ligeira a esquerda',
                    Left: 'esquerda',
                    SharpLeft: 'curva fechada a esquerda',
                    Uturn: 'Meia volta'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Siga {dir}', ' na {road}'],
                    'Continue':
                        ['Continue {dir}', ' na {road}'],
                    'SlightRight':
                        ['Curva ligeira a direita', ' na {road}'],
                    'Right':
                        ['Curva a direita', ' na {road}'],
                    'SharpRight':
                        ['Curva fechada a direita', ' na {road}'],
                    'TurnAround':
                        ['Retorne'],
                    'SharpLeft':
                        ['Curva fechada a esquerda', ' na {road}'],
                    'Left':
                        ['Curva a esquerda', ' na {road}'],
                    'SlightLeft':
                        ['Curva ligueira a esquerda', ' na {road}'],
                    'WaypointReached':
                        ['Ponto de interesse atingido'],
                    'Roundabout':
                        ['Pegue a {exitStr} saÃ­da na rotatÃ³ria', ' na {road}'],
                    'DestinationReached':
                        ['Destino atingido'],
                    'Fork': ['Na encruzilhada, vire a {modifier}', ' na {road}'],
                    'Merge': ['Entre Ã  {modifier}', ' na {road}'],
                    'OnRamp': ['Vire {modifier} na rampa', ' na {road}'],
                    'OffRamp': ['Entre na rampa na {modifier}', ' na {road}'],
                    'EndOfRoad': ['Vire {modifier} no fim da rua', ' na {road}'],
                    'Onto': 'na {road}'
                },
                formatOrder: function(n) {
                    return n + 'Âº';
                },
                ui: {
                    startPlaceholder: 'Origem',
                    viaPlaceholder: 'IntermÃ©dio {viaNumber}',
                    endPlaceholder: 'Destino'
                }
            },
            'sk': {
                directions: {
                    N: 'sever',
                    NE: 'serverovÃ½chod',
                    E: 'vÃ½chod',
                    SE: 'juhovÃ½chod',
                    S: 'juh',
                    SW: 'juhozÃ¡pad',
                    W: 'zÃ¡pad',
                    NW: 'serverozÃ¡pad'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['Mierte na {dir}', ' na {road}'],
                    'Continue':
                        ['PokraÄujte na {dir}', ' na {road}'],
                    'SlightRight':
                        ['Mierne doprava', ' na {road}'],
                    'Right':
                        ['Doprava', ' na {road}'],
                    'SharpRight':
                        ['Prudko doprava', ' na {road}'],
                    'TurnAround':
                        ['OtoÄte sa'],
                    'SharpLeft':
                        ['Prudko doÄ¾ava', ' na {road}'],
                    'Left':
                        ['DoÄ¾ava', ' na {road}'],
                    'SlightLeft':
                        ['Mierne doÄ¾ava', ' na {road}'],
                    'WaypointReached':
                        ['Ste v prejazdovom bode.'],
                    'Roundabout':
                        ['OdboÄte na {exitStr} vÃ½jazde', ' na {road}'],
                    'DestinationReached':
                        ['PriÅ¡li ste do cieÄ¾a.'],
                },
                formatOrder: function(n) {
                    var i = n % 10 - 1,
                    suffix = ['.', '.', '.'];
    
                    return suffix[i] ? n + suffix[i] : n + '.';
                },
                ui: {
                    startPlaceholder: 'ZaÄiatok',
                    viaPlaceholder: 'Cez {viaNumber}',
                    endPlaceholder: 'Koniec'
                }
            },
            'el': {
                directions: {
                    N: 'Î²ÏŒÏÎµÎ¹Î±',
                    NE: 'Î²Î¿ÏÎµÎ¹Î¿Î±Î½Î±Ï„Î¿Î»Î¹ÎºÎ¬',
                    E: 'Î±Î½Î±Ï„Î¿Î»Î¹ÎºÎ¬',
                    SE: 'Î½Î¿Ï„Î¹Î¿Î±Î½Î±Ï„Î¿Î»Î¹ÎºÎ¬',
                    S: 'Î½ÏŒÏ„Î¹Î±',
                    SW: 'Î½Î¿Ï„Î¹Î¿Î´Ï…Ï„Î¹ÎºÎ¬',
                    W: 'Î´Ï…Ï„Î¹ÎºÎ¬',
                    NW: 'Î²Î¿ÏÎµÎ¹Î¿Î´Ï…Ï„Î¹ÎºÎ¬'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['ÎšÎ±Ï„ÎµÏ…Î¸Ï…Î½Î¸ÎµÎ¯Ï„Îµ {dir}', ' ÏƒÏ„Î·Î½ {road}'],
                    'Continue':
                        ['Î£Ï…Î½ÎµÏ‡Î¯ÏƒÏ„Îµ {dir}', ' ÏƒÏ„Î·Î½ {road}'],
                    'SlightRight':
                        ['Î•Î»Î±Ï†ÏÏŽÏ‚ Î´ÎµÎ¾Î¹Î¬', ' ÏƒÏ„Î·Î½ {road}'],
                    'Right':
                        ['Î”ÎµÎ¾Î¹Î¬', ' ÏƒÏ„Î·Î½ {road}'],
                    'SharpRight':
                        ['Î‘Ï€ÏŒÏ„Î¿Î¼Î· Î´ÎµÎ¾Î¹Î¬ ÏƒÏ„ÏÎ¿Ï†Î®', ' ÏƒÏ„Î·Î½ {road}'],
                    'TurnAround':
                        ['ÎšÎ¬Î½Ï„Îµ Î±Î½Î±ÏƒÏ„ÏÎ¿Ï†Î®'],
                    'SharpLeft':
                        ['Î‘Ï€ÏŒÏ„Î¿Î¼Î· Î±ÏÎ¹ÏƒÏ„ÎµÏÎ® ÏƒÏ„ÏÎ¿Ï†Î®', ' ÏƒÏ„Î·Î½ {road}'],
                    'Left':
                        ['Î‘ÏÎ¹ÏƒÏ„ÎµÏÎ¬', ' ÏƒÏ„Î·Î½ {road}'],
                    'SlightLeft':
                        ['Î•Î»Î±Ï†ÏÏŽÏ‚ Î±ÏÎ¹ÏƒÏ„ÎµÏÎ¬', ' ÏƒÏ„Î·Î½ {road}'],
                    'WaypointReached':
                        ['Î¦Ï„Î¬ÏƒÎ±Ï„Îµ ÏƒÏ„Î¿ ÏƒÎ·Î¼ÎµÎ¯Î¿ Î±Î½Î±Ï†Î¿ÏÎ¬Ï‚'],
                    'Roundabout':
                        ['Î‘ÎºÎ¿Î»Î¿Ï…Î¸Î®ÏƒÏ„Îµ Ï„Î·Î½ {exitStr} Î­Î¾Î¿Î´Î¿ ÏƒÏ„Î¿ ÎºÏ…ÎºÎ»Î¹ÎºÏŒ ÎºÏŒÎ¼Î²Î¿', ' ÏƒÏ„Î·Î½ {road}'],
                    'DestinationReached':
                        ['Î¦Ï„Î¬ÏƒÎ±Ï„Îµ ÏƒÏ„Î¿Î½ Ï€ÏÎ¿Î¿ÏÎ¹ÏƒÎ¼ÏŒ ÏƒÎ±Ï‚'],
                },
                formatOrder: function(n) {
                    return n + 'Âº';
                },
                ui: {
                    startPlaceholder: 'Î‘Ï†ÎµÏ„Î·ÏÎ¯Î±',
                    viaPlaceholder: 'Î¼Î­ÏƒÏ‰ {viaNumber}',
                    endPlaceholder: 'Î ÏÎ¿Î¿ÏÎ¹ÏƒÎ¼ÏŒÏ‚'
                }
            },
            'ca': {
                directions: {
                    N: 'nord',
                    NE: 'nord-est',
                    E: 'est',
                    SE: 'sud-est',
                    S: 'sud',
                    SW: 'sud-oest',
                    W: 'oest',
                    NW: 'nord-oest',
                    SlightRight: 'lleu gir a la dreta',
                    Right: 'dreta',
                    SharpRight: 'gir pronunciat a la dreta',
                    SlightLeft: 'gir pronunciat a l\'esquerra',
                    Left: 'esquerra',
                    SharpLeft: 'lleu gir a l\'esquerra',
                    Uturn: 'mitja volta'
                },
                instructions: {
                    'Head':
                        ['Recte {dir}', ' sobre {road}'],
                    'Continue':
                        ['Continuar {dir}'],
                    'TurnAround':
                        ['Donar la volta'],
                    'WaypointReached':
                        ['Ha arribat a un punt del camÃ­'],
                    'Roundabout':
                        ['Agafar {exitStr} sortida a la rotonda', ' a {road}'],
                    'DestinationReached':
                        ['Arribada al destÃ­'],
                    'Fork': ['A la cruÃ¯lla gira a la {modifier}', ' cap a {road}'],
                    'Merge': ['Incorpora\'t {modifier}', ' a {road}'],
                    'OnRamp': ['Gira {modifier} a la sortida', ' cap a {road}'],
                    'OffRamp': ['Pren la sortida {modifier}', ' cap a {road}'],
                    'EndOfRoad': ['Gira {modifier} al final de la carretera', ' cap a {road}'],
                    'Onto': 'cap a {road}'
                },
                formatOrder: function(n) {
                    return n + 'Âº';
                },
                ui: {
                    startPlaceholder: 'Origen',
                    viaPlaceholder: 'Via {viaNumber}',
                    endPlaceholder: 'DestÃ­'
                },
                units: {
                    meters: 'm',
                    kilometers: 'km',
                    yards: 'yd',
                    miles: 'mi',
                    hours: 'h',
                    minutes: 'min',
                    seconds: 's'
                }
            },
            'ru': {
                directions: {
                    N: 'ÑÐµÐ²ÐµÑ€',
                    NE: 'ÑÐµÐ²ÐµÑ€Ð¾Ð²Ð¾ÑÑ‚Ð¾Ðº',
                    E: 'Ð²Ð¾ÑÑ‚Ð¾Ðº',
                    SE: 'ÑŽÐ³Ð¾Ð²Ð¾ÑÑ‚Ð¾Ðº',
                    S: 'ÑŽÐ³',
                    SW: 'ÑŽÐ³Ð¾Ð·Ð°Ð¿Ð°Ð´',
                    W: 'Ð·Ð°Ð¿Ð°Ð´',
                    NW: 'ÑÐµÐ²ÐµÑ€Ð¾Ð·Ð°Ð¿Ð°Ð´',
                    SlightRight: 'Ð¿Ð»Ð°Ð²Ð½Ð¾ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¾',
                    Right: 'Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¾',
                    SharpRight: 'Ñ€ÐµÐ·ÐºÐ¾ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¾',
                    SlightLeft: 'Ð¿Ð»Ð°Ð²Ð½Ð¾ Ð½Ð°Ð»ÐµÐ²Ð¾',
                    Left: 'Ð½Ð°Ð»ÐµÐ²Ð¾',
                    SharpLeft: 'Ñ€ÐµÐ·ÐºÐ¾ Ð½Ð°Ð»ÐµÐ²Ð¾',
                    Uturn: 'Ñ€Ð°Ð·Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒÑÑ'
                },
                instructions: {
                    'Head':
                        ['ÐÐ°Ñ‡Ð°Ñ‚ÑŒ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ðµ Ð½Ð° {dir}', ' Ð¿Ð¾ {road}'],
                    'Continue':
                        ['ÐŸÑ€Ð¾Ð´Ð¾Ð»Ð¶Ð°Ñ‚ÑŒ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ðµ Ð½Ð° {dir}', ' Ð¿Ð¾ {road}'],
                    'SlightRight':
                        ['ÐŸÐ»Ð°Ð²Ð½Ñ‹Ð¹ Ð¿Ð¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¾', ' Ð½Ð° {road}'],
                    'Right':
                        ['ÐÐ°Ð¿Ñ€Ð°Ð²Ð¾', ' Ð½Ð° {road}'],
                    'SharpRight':
                        ['Ð ÐµÐ·ÐºÐ¸Ð¹ Ð¿Ð¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð¾', ' Ð½Ð° {road}'],
                    'TurnAround':
                        ['Ð Ð°Ð·Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒÑÑ'],
                    'SharpLeft':
                        ['Ð ÐµÐ·ÐºÐ¸Ð¹ Ð¿Ð¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ð½Ð°Ð»ÐµÐ²Ð¾', ' Ð½Ð° {road}'],
                    'Left':
                        ['ÐŸÐ¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ð½Ð°Ð»ÐµÐ²Ð¾', ' Ð½Ð° {road}'],
                    'SlightLeft':
                        ['ÐŸÐ»Ð°Ð²Ð½Ñ‹Ð¹ Ð¿Ð¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ð½Ð°Ð»ÐµÐ²Ð¾', ' Ð½Ð° {road}'],
                    'WaypointReached':
                        ['Ð¢Ð¾Ñ‡ÐºÐ° Ð´Ð¾ÑÑ‚Ð¸Ð³Ð½ÑƒÑ‚Ð°'],
                    'Roundabout':
                        ['{exitStr} ÑÑŠÐµÐ·Ð´ Ñ ÐºÐ¾Ð»ÑŒÑ†Ð°', ' Ð½Ð° {road}'],
                    'DestinationReached':
                        ['ÐžÐºÐ¾Ð½Ñ‡Ð°Ð½Ð¸Ðµ Ð¼Ð°Ñ€ÑˆÑ€ÑƒÑ‚Ð°'],
                    'Fork': ['ÐÐ° Ñ€Ð°Ð·Ð²Ð¸Ð»ÐºÐµ Ð¿Ð¾Ð²ÐµÑ€Ð½Ð¸Ñ‚Ðµ {modifier}', ' Ð½Ð° {road}'],
                    'Merge': ['ÐŸÐµÑ€ÐµÑÑ‚Ñ€Ð¾Ð¹Ñ‚ÐµÑÑŒ {modifier}', ' Ð½Ð° {road}'],
                    'OnRamp': ['ÐŸÐ¾Ð²ÐµÑ€Ð½Ð¸Ñ‚Ðµ {modifier} Ð½Ð° ÑÑŠÐµÐ·Ð´', ' Ð½Ð° {road}'],
                    'OffRamp': ['Ð¡ÑŠÐµÐ·Ð¶Ð°Ð¹Ñ‚Ðµ Ð½Ð° {modifier}', ' Ð½Ð° {road}'],
                    'EndOfRoad': ['ÐŸÐ¾Ð²ÐµÑ€Ð½Ð¸Ñ‚Ðµ {modifier} Ð² ÐºÐ¾Ð½Ñ†Ðµ Ð´Ð¾Ñ€Ð¾Ð³Ð¸', ' Ð½Ð° {road}'],
                    'Onto': 'Ð½Ð° {road}'
                },
                formatOrder: function(n) {
                    return n + '-Ð¹';
                },
                ui: {
                    startPlaceholder: 'ÐÐ°Ñ‡Ð°Ð»Ð¾',
                    viaPlaceholder: 'Ð§ÐµÑ€ÐµÐ· {viaNumber}',
                    endPlaceholder: 'ÐšÐ¾Ð½ÐµÑ†'
                },
                units: {
                    meters: 'Ð¼',
                    kilometers: 'ÐºÐ¼',
                    yards: 'ÑÑ€Ð´',
                    miles: 'Ð¼Ð¸',
                    hours: 'Ñ‡',
                    minutes: 'Ð¼',
                    seconds: 'Ñ'
                }
            }
        });
    })();
    
    },{}],20:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        var OSRMv1 = _dereq_('./osrm-v1');
    
        /**
         * Works against OSRM's new API in version 5.0; this has
         * the API version v1.
         */
        module.exports = OSRMv1.extend({
            options: {
                serviceUrl: 'https://api.mapbox.com/directions/v5',
                profile: 'mapbox/driving',
                useHints: false
            },
    
            initialize: function(accessToken, options) {
                L.Routing.OSRMv1.prototype.initialize.call(this, options);
                this.options.requestParameters = this.options.requestParameters || {};
                /* jshint camelcase: false */
                this.options.requestParameters.access_token = accessToken;
                /* jshint camelcase: true */
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./osrm-v1":21}],21:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null),
            corslite = _dereq_('corslite'),
            polyline = _dereq_('polyline'),
            osrmTextInstructions = _dereq_('osrm-text-instructions');
    
        // Ignore camelcase naming for this file, since OSRM's API uses
        // underscores.
        /* jshint camelcase: false */
    
        var Waypoint = _dereq_('./waypoint');
    
        /**
         * Works against OSRM's new API in version 5.0; this has
         * the API version v1.
         */
        module.exports = L.Class.extend({
            options: {
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'driving',
                timeout: 30 * 1000,
                routingOptions: {
                    alternatives: true,
                    steps: true
                },
                polylinePrecision: 5,
                useHints: true,
                suppressDemoServerWarning: true,
                language: 'en'
            },
    
            initialize: function(options) {
                L.Util.setOptions(this, options);
                this._hints = {
                    locations: {}
                };
    
                if (!this.options.suppressDemoServerWarning &&
                    this.options.serviceUrl.indexOf('//router.project-osrm.org') >= 0) {
                    console.warn('You are using OSRM\'s demo server. ' +
                        'Please note that it is **NOT SUITABLE FOR PRODUCTION USE**.\n' +
                        'Refer to the demo server\'s usage policy: ' +
                        'https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy\n\n' +
                        'To change, set the serviceUrl option.\n\n' +
                        'Please do not report issues with this server to neither ' +
                        'Leaflet Routing Machine or OSRM - it\'s for\n' +
                        'demo only, and will sometimes not be available, or work in ' +
                        'unexpected ways.\n\n' +
                        'Please set up your own OSRM server, or use a paid service ' +
                        'provider for production.');
                }
            },
    
            route: function(waypoints, callback, context, options) {
                var timedOut = false,
                    wps = [],
                    url,
                    timer,
                    wp,
                    i,
                    xhr;
    
                options = L.extend({}, this.options.routingOptions, options);
                url = this.buildRouteUrl(waypoints, options);
                if (this.options.requestParameters) {
                    url += L.Util.getParamString(this.options.requestParameters, url);
                }
    
                timer = setTimeout(function() {
                    timedOut = true;
                    callback.call(context || callback, {
                        status: -1,
                        message: 'OSRM request timed out.'
                    });
                }, this.options.timeout);
    
                // Create a copy of the waypoints, since they
                // might otherwise be asynchronously modified while
                // the request is being processed.
                for (i = 0; i < waypoints.length; i++) {
                    wp = waypoints[i];
                    wps.push(new Waypoint(wp.latLng, wp.name, wp.options));
                }
    
                return xhr = corslite(url, L.bind(function(err, resp) {
                    var data,
                        error =  {};
    
                    clearTimeout(timer);
                    if (!timedOut) {
                        if (!err) {
                            try {
                                data = JSON.parse(resp.responseText);
                                try {
                                    return this._routeDone(data, wps, options, callback, context);
                                } catch (ex) {
                                    error.status = -3;
                                    error.message = ex.toString();
                                }
                            } catch (ex) {
                                error.status = -2;
                                error.message = 'Error parsing OSRM response: ' + ex.toString();
                            }
                        } else {
                            error.message = 'HTTP request failed: ' + err.type +
                                (err.target && err.target.status ? ' HTTP ' + err.target.status + ': ' + err.target.statusText : '');
                            error.url = url;
                            error.status = -1;
                            error.target = err;
                        }
    
                        callback.call(context || callback, error);
                    } else {
                        xhr.abort();
                    }
                }, this));
            },
    
            requiresMoreDetail: function(route, zoom, bounds) {
                if (!route.properties.isSimplified) {
                    return false;
                }
    
                var waypoints = route.inputWaypoints,
                    i;
                for (i = 0; i < waypoints.length; ++i) {
                    if (!bounds.contains(waypoints[i].latLng)) {
                        return true;
                    }
                }
    
                return false;
            },
    
            _routeDone: function(response, inputWaypoints, options, callback, context) {
                var alts = [],
                    actualWaypoints,
                    i,
                    route;
    
                context = context || callback;
                if (response.code !== 'Ok') {
                    callback.call(context, {
                        status: response.code
                    });
                    return;
                }
    
                actualWaypoints = this._toWaypoints(inputWaypoints, response.waypoints);
    
                for (i = 0; i < response.routes.length; i++) {
                    route = this._convertRoute(response.routes[i]);
                    route.inputWaypoints = inputWaypoints;
                    route.waypoints = actualWaypoints;
                    route.properties = {isSimplified: !options || !options.geometryOnly || options.simplifyGeometry};
                    alts.push(route);
                }
    
                this._saveHintData(response.waypoints, inputWaypoints);
    
                callback.call(context, null, alts);
            },
    
            _convertRoute: function(responseRoute) {
                var result = {
                        name: '',
                        coordinates: [],
                        instructions: [],
                        summary: {
                            totalDistance: responseRoute.distance,
                            totalTime: responseRoute.duration
                        }
                    },
                    legNames = [],
                    waypointIndices = [],
                    index = 0,
                    legCount = responseRoute.legs.length,
                    hasSteps = responseRoute.legs[0].steps.length > 0,
                    i,
                    j,
                    leg,
                    step,
                    geometry,
                    type,
                    modifier,
                    text,
                    stepToText;
    
                if (this.options.stepToText) {
                    stepToText = this.options.stepToText;
                } else {
                    var textInstructions = osrmTextInstructions('v5', this.options.language);
                    stepToText = textInstructions.compile.bind(textInstructions);
                }
    
                for (i = 0; i < legCount; i++) {
                    leg = responseRoute.legs[i];
                    legNames.push(leg.summary && leg.summary.charAt(0).toUpperCase() + leg.summary.substring(1));
                    for (j = 0; j < leg.steps.length; j++) {
                        step = leg.steps[j];
                        geometry = this._decodePolyline(step.geometry);
                        result.coordinates.push.apply(result.coordinates, geometry);
                        type = this._maneuverToInstructionType(step.maneuver, i === legCount - 1);
                        modifier = this._maneuverToModifier(step.maneuver);
                        text = stepToText(step);
    
                        if (type) {
                            if ((i == 0 && step.maneuver.type == 'depart') || step.maneuver.type == 'arrive') {
                                waypointIndices.push(index);
                            }
    
                            result.instructions.push({
                                type: type,
                                distance: step.distance,
                                time: step.duration,
                                road: step.name,
                                direction: this._bearingToDirection(step.maneuver.bearing_after),
                                exit: step.maneuver.exit,
                                index: index,
                                mode: step.mode,
                                modifier: modifier,
                                text: text
                            });
                        }
    
                        index += geometry.length;
                    }
                }
    
                result.name = legNames.join(', ');
                if (!hasSteps) {
                    result.coordinates = this._decodePolyline(responseRoute.geometry);
                } else {
                    result.waypointIndices = waypointIndices;
                }
    
                return result;
            },
    
            _bearingToDirection: function(bearing) {
                var oct = Math.round(bearing / 45) % 8;
                return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][oct];
            },
    
            _maneuverToInstructionType: function(maneuver, lastLeg) {
                switch (maneuver.type) {
                case 'new name':
                    return 'Continue';
                case 'depart':
                    return 'Head';
                case 'arrive':
                    return lastLeg ? 'DestinationReached' : 'WaypointReached';
                case 'roundabout':
                case 'rotary':
                    return 'Roundabout';
                case 'merge':
                case 'fork':
                case 'on ramp':
                case 'off ramp':
                case 'end of road':
                    return this._camelCase(maneuver.type);
                // These are all reduced to the same instruction in the current model
                //case 'turn':
                //case 'ramp': // deprecated in v5.1
                default:
                    return this._camelCase(maneuver.modifier);
                }
            },
    
            _maneuverToModifier: function(maneuver) {
                var modifier = maneuver.modifier;
    
                switch (maneuver.type) {
                case 'merge':
                case 'fork':
                case 'on ramp':
                case 'off ramp':
                case 'end of road':
                    modifier = this._leftOrRight(modifier);
                }
    
                return modifier && this._camelCase(modifier);
            },
    
            _camelCase: function(s) {
                var words = s.split(' '),
                    result = '';
                for (var i = 0, l = words.length; i < l; i++) {
                    result += words[i].charAt(0).toUpperCase() + words[i].substring(1);
                }
    
                return result;
            },
    
            _leftOrRight: function(d) {
                return d.indexOf('left') >= 0 ? 'Left' : 'Right';
            },
    
            _decodePolyline: function(routeGeometry) {
                var cs = polyline.decode(routeGeometry, this.options.polylinePrecision),
                    result = new Array(cs.length),
                    i;
                for (i = cs.length - 1; i >= 0; i--) {
                    result[i] = L.latLng(cs[i]);
                }
    
                return result;
            },
    
            _toWaypoints: function(inputWaypoints, vias) {
                var wps = [],
                    i,
                    viaLoc;
                for (i = 0; i < vias.length; i++) {
                    viaLoc = vias[i].location;
                    wps.push(new Waypoint(L.latLng(viaLoc[1], viaLoc[0]),
                                                inputWaypoints[i].name,
                                                inputWaypoints[i].options));
                }
    
                return wps;
            },
    
            buildRouteUrl: function(waypoints, options) {
                var locs = [],
                    hints = [],
                    wp,
                    latLng,
                    computeInstructions,
                    computeAlternative = true;
    
                for (var i = 0; i < waypoints.length; i++) {
                    wp = waypoints[i];
                    latLng = wp.latLng;
                    locs.push(latLng.lng + ',' + latLng.lat);
                    hints.push(this._hints.locations[this._locationKey(latLng)] || '');
                }
    
                computeInstructions =
                    true;
    
                return this.options.serviceUrl + '/' + this.options.profile + '/' +
                    locs.join(';') + '?' +
                    (options.geometryOnly ? (options.simplifyGeometry ? '' : 'overview=full') : 'overview=false') +
                    '&alternatives=' + computeAlternative.toString() +
                    '&steps=' + computeInstructions.toString() +
                    (this.options.useHints ? '&hints=' + hints.join(';') : '') +
                    (options.allowUTurns ? '&continue_straight=' + !options.allowUTurns : '');
            },
    
            _locationKey: function(location) {
                return location.lat + ',' + location.lng;
            },
    
            _saveHintData: function(actualWaypoints, waypoints) {
                var loc;
                this._hints = {
                    locations: {}
                };
                for (var i = actualWaypoints.length - 1; i >= 0; i--) {
                    loc = waypoints[i].latLng;
                    this._hints.locations[this._locationKey(loc)] = actualWaypoints[i].hint;
                }
            },
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./waypoint":23,"corslite":1,"osrm-text-instructions":2,"polyline":9}],22:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
        var GeocoderElement = _dereq_('./geocoder-element');
        var Waypoint = _dereq_('./waypoint');
    
        module.exports = (L.Layer || L.Class).extend({
            includes: L.Mixin.Events,
    
            options: {
                dragStyles: [
                    {color: 'black', opacity: 0.15, weight: 9},
                    {color: 'white', opacity: 0.8, weight: 6},
                    {color: 'red', opacity: 1, weight: 2, dashArray: '7,12'}
                ],
                draggableWaypoints: true,
                routeWhileDragging: false,
                addWaypoints: true,
                reverseWaypoints: false,
                addButtonClassName: '',
                language: 'en',
                createGeocoderElement: function(wp, i, nWps, plan) {
                    return new GeocoderElement(wp, i, nWps, plan);
                },
                createMarker: function(i, wp) {
                    var options = {
                            draggable: this.draggableWaypoints
                        },
                        marker = L.marker(wp.latLng, options);
    
                    return marker;
                },
                geocodersClassName: ''
            },
    
            initialize: function(waypoints, options) {
                L.Util.setOptions(this, options);
                this._waypoints = [];
                this.setWaypoints(waypoints);
            },
    
            isReady: function() {
                var i;
                for (i = 0; i < this._waypoints.length; i++) {
                    if (!this._waypoints[i].latLng) {
                        return false;
                    }
                }
    
                return true;
            },
    
            getWaypoints: function() {
                var i,
                    wps = [];
    
                for (i = 0; i < this._waypoints.length; i++) {
                    wps.push(this._waypoints[i]);
                }
    
                return wps;
            },
    
            setWaypoints: function(waypoints) {
                var args = [0, this._waypoints.length].concat(waypoints);
                this.spliceWaypoints.apply(this, args);
                return this;
            },
    
            spliceWaypoints: function() {
                var args = [arguments[0], arguments[1]],
                    i;
    
                for (i = 2; i < arguments.length; i++) {
                    args.push(arguments[i] && arguments[i].hasOwnProperty('latLng') ? arguments[i] : new Waypoint(arguments[i]));
                }
    
                [].splice.apply(this._waypoints, args);
    
                // Make sure there's always at least two waypoints
                while (this._waypoints.length < 2) {
                    this.spliceWaypoints(this._waypoints.length, 0, null);
                }
    
                this._updateMarkers();
                this._fireChanged.apply(this, args);
            },
    
            onAdd: function(map) {
                this._map = map;
                this._updateMarkers();
            },
    
            onRemove: function() {
                var i;
                this._removeMarkers();
    
                if (this._newWp) {
                    for (i = 0; i < this._newWp.lines.length; i++) {
                        this._map.removeLayer(this._newWp.lines[i]);
                    }
                }
    
                delete this._map;
            },
    
            createGeocoders: function() {
                var container = L.DomUtil.create('div', 'leaflet-routing-geocoders ' + this.options.geocodersClassName),
                    waypoints = this._waypoints,
                    addWpBtn,
                    reverseBtn;
    
                this._geocoderContainer = container;
                this._geocoderElems = [];
    
    
                if (this.options.addWaypoints) {
                    addWpBtn = L.DomUtil.create('button', 'leaflet-routing-add-waypoint ' + this.options.addButtonClassName, container);
                    addWpBtn.setAttribute('type', 'button');
                    L.DomEvent.addListener(addWpBtn, 'click', function() {
                        this.spliceWaypoints(waypoints.length, 0, null);
                    }, this);
                }
    
                if (this.options.reverseWaypoints) {
                    reverseBtn = L.DomUtil.create('button', 'leaflet-routing-reverse-waypoints', container);
                    reverseBtn.setAttribute('type', 'button');
                    L.DomEvent.addListener(reverseBtn, 'click', function() {
                        this._waypoints.reverse();
                        this.setWaypoints(this._waypoints);
                    }, this);
                }
    
                this._updateGeocoders();
                this.on('waypointsspliced', this._updateGeocoders);
    
                return container;
            },
    
            _createGeocoder: function(i) {
                var geocoder = this.options.createGeocoderElement(this._waypoints[i], i, this._waypoints.length, this.options);
                geocoder
                .on('delete', function() {
                    if (i > 0 || this._waypoints.length > 2) {
                        this.spliceWaypoints(i, 1);
                    } else {
                        this.spliceWaypoints(i, 1, new Waypoint());
                    }
                }, this)
                .on('geocoded', function(e) {
                    this._updateMarkers();
                    this._fireChanged();
                    this._focusGeocoder(i + 1);
                    this.fire('waypointgeocoded', {
                        waypointIndex: i,
                        waypoint: e.waypoint
                    });
                }, this)
                .on('reversegeocoded', function(e) {
                    this.fire('waypointgeocoded', {
                        waypointIndex: i,
                        waypoint: e.waypoint
                    });
                }, this);
    
                return geocoder;
            },
    
            _updateGeocoders: function() {
                var elems = [],
                    i,
                    geocoderElem;
    
                for (i = 0; i < this._geocoderElems.length; i++) {
                    this._geocoderContainer.removeChild(this._geocoderElems[i].getContainer());
                }
    
                for (i = this._waypoints.length - 1; i >= 0; i--) {
                    geocoderElem = this._createGeocoder(i);
                    this._geocoderContainer.insertBefore(geocoderElem.getContainer(), this._geocoderContainer.firstChild);
                    elems.push(geocoderElem);
                }
    
                this._geocoderElems = elems.reverse();
            },
    
            _removeMarkers: function() {
                var i;
                if (this._markers) {
                    for (i = 0; i < this._markers.length; i++) {
                        if (this._markers[i]) {
                            this._map.removeLayer(this._markers[i]);
                        }
                    }
                }
                this._markers = [];
            },
    
            _updateMarkers: function() {
                var i,
                    m;
    
                if (!this._map) {
                    return;
                }
    
                this._removeMarkers();
    
                for (i = 0; i < this._waypoints.length; i++) {
                    if (this._waypoints[i].latLng) {
                        m = this.options.createMarker(i, this._waypoints[i], this._waypoints.length);
                        if (m) {
                            m.addTo(this._map);
                            if (this.options.draggableWaypoints) {
                                this._hookWaypointEvents(m, i);
                            }
                        }
                    } else {
                        m = null;
                    }
                    this._markers.push(m);
                }
            },
    
            _fireChanged: function() {
                this.fire('waypointschanged', {waypoints: this.getWaypoints()});
    
                if (arguments.length >= 2) {
                    this.fire('waypointsspliced', {
                        index: Array.prototype.shift.call(arguments),
                        nRemoved: Array.prototype.shift.call(arguments),
                        added: arguments
                    });
                }
            },
    
            _hookWaypointEvents: function(m, i, trackMouseMove) {
                var eventLatLng = function(e) {
                        return trackMouseMove ? e.latlng : e.target.getLatLng();
                    },
                    dragStart = L.bind(function(e) {
                        this.fire('waypointdragstart', {index: i, latlng: eventLatLng(e)});
                    }, this),
                    drag = L.bind(function(e) {
                        this._waypoints[i].latLng = eventLatLng(e);
                        this.fire('waypointdrag', {index: i, latlng: eventLatLng(e)});
                    }, this),
                    dragEnd = L.bind(function(e) {
                        this._waypoints[i].latLng = eventLatLng(e);
                        this._waypoints[i].name = '';
                        if (this._geocoderElems) {
                            this._geocoderElems[i].update(true);
                        }
                        this.fire('waypointdragend', {index: i, latlng: eventLatLng(e)});
                        this._fireChanged();
                    }, this),
                    mouseMove,
                    mouseUp;
    
                if (trackMouseMove) {
                    mouseMove = L.bind(function(e) {
                        this._markers[i].setLatLng(e.latlng);
                        drag(e);
                    }, this);
                    mouseUp = L.bind(function(e) {
                        this._map.dragging.enable();
                        this._map.off('mouseup', mouseUp);
                        this._map.off('mousemove', mouseMove);
                        dragEnd(e);
                    }, this);
                    this._map.dragging.disable();
                    this._map.on('mousemove', mouseMove);
                    this._map.on('mouseup', mouseUp);
                    dragStart({latlng: this._waypoints[i].latLng});
                } else {
                    m.on('dragstart', dragStart);
                    m.on('drag', drag);
                    m.on('dragend', dragEnd);
                }
            },
    
            dragNewWaypoint: function(e) {
                var newWpIndex = e.afterIndex + 1;
                if (this.options.routeWhileDragging) {
                    this.spliceWaypoints(newWpIndex, 0, e.latlng);
                    this._hookWaypointEvents(this._markers[newWpIndex], newWpIndex, true);
                } else {
                    this._dragNewWaypoint(newWpIndex, e.latlng);
                }
            },
    
            _dragNewWaypoint: function(newWpIndex, initialLatLng) {
                var wp = new Waypoint(initialLatLng),
                    prevWp = this._waypoints[newWpIndex - 1],
                    nextWp = this._waypoints[newWpIndex],
                    marker = this.options.createMarker(newWpIndex, wp, this._waypoints.length + 1),
                    lines = [],
                    draggingEnabled = this._map.dragging.enabled(),
                    mouseMove = L.bind(function(e) {
                        var i,
                            latLngs;
                        if (marker) {
                            marker.setLatLng(e.latlng);
                        }
                        for (i = 0; i < lines.length; i++) {
                            latLngs = lines[i].getLatLngs();
                            latLngs.splice(1, 1, e.latlng);
                            lines[i].setLatLngs(latLngs);
                        }
    
                        L.DomEvent.stop(e);
                    }, this),
                    mouseUp = L.bind(function(e) {
                        var i;
                        if (marker) {
                            this._map.removeLayer(marker);
                        }
                        for (i = 0; i < lines.length; i++) {
                            this._map.removeLayer(lines[i]);
                        }
                        this._map.off('mousemove', mouseMove);
                        this._map.off('mouseup', mouseUp);
                        this.spliceWaypoints(newWpIndex, 0, e.latlng);
                        if (draggingEnabled) {
                            this._map.dragging.enable();
                        }
                    }, this),
                    i;
    
                if (marker) {
                    marker.addTo(this._map);
                }
    
                for (i = 0; i < this.options.dragStyles.length; i++) {
                    lines.push(L.polyline([prevWp.latLng, initialLatLng, nextWp.latLng],
                        this.options.dragStyles[i]).addTo(this._map));
                }
    
                if (draggingEnabled) {
                    this._map.dragging.disable();
                }
    
                this._map.on('mousemove', mouseMove);
                this._map.on('mouseup', mouseUp);
            },
    
            _focusGeocoder: function(i) {
                if (this._geocoderElems[i]) {
                    this._geocoderElems[i].focus();
                } else {
                    document.activeElement.blur();
                }
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{"./geocoder-element":14,"./waypoint":23}],23:[function(_dereq_,module,exports){
    (function (global){
    (function() {
        'use strict';
    
        var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    
        module.exports = L.Class.extend({
            options: {
                allowUTurn: false,
            },
            initialize: function(latLng, name, options) {
                L.Util.setOptions(this, options);
                this.latLng = L.latLng(latLng);
                this.name = name;
            }
        });
    })();
    
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    },{}]},{},[15]);
    