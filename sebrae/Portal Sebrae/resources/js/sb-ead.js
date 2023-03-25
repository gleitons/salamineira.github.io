if ($('body').hasClass('sb-grid__ead')) {
    window.addEventListener("pageshow", function (event) {
      updateFiltersFromCookies();
    });
  
    $(document).ready(function () {
          var dictFilter = {
              'tenho-negocio': 'momento-2',
              'abrir-negocio': 'momento-1',
              'cursos': 'tipo-191',
              'whatsapp': 'tipo-243',
              'ebooks': 'tipo-195',
              'jogos': 'tipo-241',
              'webinar': 'tipo-webinar',
              'cooperacao': 'tema-1',
              'empreendedorismo': 'tema-2',
              'financas': 'tema-3',
              'inovacao': 'tema-4',
              'leis': 'tema-5',
              'mercado': 'tema-6',
              'organizacao': 'tema-7',
              'pessoas': 'tema-8',
              'planejamento': 'tema-9',
          }
          
          var filterParam = getParam('filtro');
          
          if(filterParam != null){
              aprenderHoje($('#'+dictFilter[filterParam]));
          }else{
              aprenderHoje($('#noFilter'));
          }
  
          if($(window).width() < 992){
           // busca
            aprenderHoje(null);
          } else {
            // exibe resulta da pesquisa
                resultSearchCards();
          }
      
          // tecla enter
          $(document).keypress(function(e) {
            if ($("#learnTodaySearch").is(":focus") && (e.keycode == 13 || e.which == 13)) {
              $("#learnTodaySearch").blur();
              $('.sb-home-ead__learn-today__search__ipt #search').click();
            }
          });
      
          $('.sb-home-ead__learn-today__search__ipt #search').click(function(e) {
            e.preventDefault();
            $(this).parent().find('.sb-components__autocomplete').removeClass('active');
            // if($("#learnTodaySearch").val() !== "") {
              // Google Tags
              var textDig = $("#learnTodaySearch").val();
              dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'busca' , 'eventoRotulo' : textDig });
                
              // busca
              aprenderHoje(this);
          });
  
      $(document).on("keyup", "#learnTodaySearch", function() {
          var q = $("#learnTodaySearch").val();
          var suggestions_ul = $("#learnTodaySearch_autocomplete");
          suggestions_ul.html("");
          $(this).parent().find('.sb-components__autocomplete').removeClass('active');
          if (q.length > 2) {
              var request_suggestions = new XMLHttpRequest();
              request_suggestions.open('GET', window.location.protocol + "//" + window.location.host + '/sebraena-templating/controller/buscaSuggestions/list?q=' + q, false);
              request_suggestions.send();
              var suggestions = JSON.parse(request_suggestions.responseText);
              if (suggestions !== null && suggestions !== undefined && suggestions.length > 0) {
                  $.each(suggestions, function (index, suggestion) {
                      var el_li = $("<li>");
                      el_li.html(suggestion);
                      el_li.click(function() {
                          $("#learnTodaySearch").blur();
                          $("#learnTodaySearch").val(this.innerHTML);
                          $('.sb-home-ead__learn-today__search__ipt #search').click();
                      });
                      suggestions_ul.append(el_li);
                  });
                  $(this).parent().find('.sb-components__autocomplete').addClass('active');
              }
          }
      });
  
    });
  
    // function busca
    function aprenderHoje(button, cookies) {
  
      $("#showMore").hide();
  
      var vgnextcomponentid = $("#vgnextcomponentid").val();
      var order = $("#selected-order").attr('data-id');
      var qtd = "0";
      var reset = true;
      
      if (button !== null) {
        if ($(button).attr('id') === "noFilter") {
          $(".sb-home-ead__learn-today__filters__a a").not('#noFilter').each(function(){
            if ($(this).hasClass("active")) {
              $(this).removeClass("active");
            }
          });
          $(button).addClass("active");
          
          // Limpa cookie filtros
          criaCookie('filterEadFiltros', '', true);
        } else if ($(button).attr('id') === "showMore") {
          qtd = $("#qtd").val();
          // console.log("qtd = " + qtd);
          reset = false;
        } else if ($(button).attr('id') === "order") {
          order = $(button).attr('data-id');
          $("#selected-order").html($(button).text()+'<span></span>');
          $("#selected-order").attr("data-id", order);
        } else {
            $(button).toggleClass("active");
        } 
      }else{
          reset = false;
      }
      
      var url = document.location.protocol + "//" + document.location.host + "/sites/render/component?vgnextcomponentid=" + vgnextcomponentid + "&qtd=" + qtd;
      
      var termo = "";
      if (cookies === true) {
          // le o cookie com o termo buscado
          termo = lerCookie("filterEadAssunto");
      } else {
          termo = $("#learnTodaySearch").val();
          // cria cookie com o termo buscado
          criaCookie('filterEadAssunto', termo, true);
      }
      if (termo !== "") {
        url += "&query=" + termo;
      }
      
      if (cookies === true) {
          // le o cookie com a ordem selecionada
          order = lerCookie("filterEadOrdem");
      } else {
          // cria cookie com a ordem selecionada
          criaCookie('filterEadOrdem', order, true);
      }
      url += "&order=" + order;
      
      var filters = "";
      if (cookies === true) {
          // le o cookie com os filtros selecionados
          filters = lerCookie("filterEadFiltros");
      } else {
          $(".sb-home-ead__learn-today__filters__a a").not('#noFilter').each(function(){
              if ($(this).hasClass("active")){
                  filters += $(this).attr("data-id") + ",";
              }
          });
          filters = filters.substring(0, filters.lastIndexOf(","));
          // cria cookie com os filtros selecionados
          criaCookie('filterEadFiltros', filters, true);
      }
      url += "&filters=" + filters;
      
      if (filters === "") {
        $("#noFilter").addClass("active");
        $("#noFilter").text("Todos");
      } else {
        $("#noFilter").removeClass("active");
        $("#noFilter").text("Limpar filtros");
      }
  
      if($(window).width() < 992){
        url += '&batchsize=6';
      }
      
      if(reset) {
        // loading
        $("#list-cards").html('<div class="sb-loading"><span></span></div>');
      }
      
      console.log("URL: "+url);
      $.ajax({
        url: url,
        dataType: 'text',
        cache: false,
        success: function(data) {
          if (data != null) {
            var el = $("<div></div>");
            el.html(data);
            var oldCode = "";
            if (!reset) {
                oldCode = $("#list-cards").html();
            }
            var newCode = $("#list-cards", el).html();
            $("#list-cards").html(oldCode + newCode);
            var hasNext = $("#hasNext", el).val();
            $("#hasNext").val(hasNext);
            // console.log("hasNext = " + hasNext);
            var total = $("#total", el).val();
            $("#total").val(total);
            // console.log("total = " + total);
            var qtd = $("#qtd", el).val();
            $("#qtd").val(qtd);
            // console.log("qtd = " + qtd);
            if (hasNext === "true") {
              $("#showMore").show();
            } else {
                $("#showMore").hide();
            }
  
            // exibe resulta da pesquisa
            resultSearchCards(total, qtd);
  
            if (reset) {
                // rolar a pagina
               if($(window).width() > 992){
                   $("html, body").animate({scrollTop: $('.sb-home-ead__learn-today').offset().top - 40}, 500);
               } else {
                 $("html, body").animate({scrollTop: $('#learnTodaySearch').offset().top - 80}, 500);
               }
            }
          }
        },
        complete: function() {
          cutTextCardProduto('.sb-home-ead__learn-today__cards .sb-components-card');
          calcHeightCard('.sb-home-ead__learn-today__cards');
          loadWebinar();
          loadFavoritos();
          sbLazyImages();
        },
        error: function() {
          // console.log('ajax error')
        }
      });
    }
    
    function updateFiltersFromCookies() {
  
        var filters = lerCookie("filterEadFiltros");
  
        if(filters != null) {
  
        //update filters
        $(".sb-home-ead__learn-today__filters__a a").not('#noFilter').each(function(){
          $(this).removeClass("active");
        });
  
        var filterList = filters.split(",");
        var size = filterList.length;
        for (var i = 0; i < size; i++) {
          $('*[data-id="' + filterList[i] + '"]').addClass("active");
        }
  
        if(size > 0){
            $("#list-cards").html('');
        }
        //carregar cards
        aprenderHoje(null, true);
  
      }
        
    }
  
    // exibe resulta da pesquisa
    function resultSearchCards(total, qtd) {
        if (total == null) {
            total = $('#total').val();
        }
        if (qtd == null) {
            qtd = $('#qtd').val();
        }
        var label = ' resultados';
        if (total == '1') {
            label = ' resultado';
        }
        if (qtd != '0') {
            $('.sb-home-ead__learn-today__search__result__result-search').text('Exibindo 1 - '+qtd+' de '+total+label);
        } else {
            $('.sb-home-ead__learn-today__search__result__result-search').text('');
        }
    }
    
    // Google Tags
    // dataLayer.push({'event' : 'pageTrack' , 'PNPagina' : 'teste_Homologacao'});
  
    console.log('teste_Homologacao');
  
    // banner_slider
    $(document).on('click', '#sbCarouselHomeEad button.owl-prev', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'banner_slider' , 'eventoRotulo' : 'seta_retrocede'})
    });
    $(document).on('click', '#sbCarouselHomeEad button.owl-next', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'banner_slider' , 'eventoRotulo' : 'seta_avanca'})
    });
    $(document).on('click', '#sbCarouselHomeEad .item .description a', function(){
      var titleArtigo = $(this).parent().find('b').text();
      var linkSaida = $(this).attr('href');
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'bt_maisInfo_'+titleArtigo , 'eventoRotulo' : linkSaida })
    });
    // bt_continuarCurso
    $(document).on('click', '.sb-home-ead__learn-today__btn a', function(){
      var linkCurso = $(this).attr('href');
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'bt_continuarCurso' , 'eventoRotulo' : linkCurso})
    });
    // filtro_ordenacao
    $(document).on('click', '.sb-home-ead__learn-today__search__dropdown .sb-components-dropdown__header', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'filtro_ordenacao' , 'eventoRotulo' : 'abertura'})
    });
    $(document).on('click', '.sb-home-ead__learn-today__search__dropdown a', function(){
      var opcaoClicada = $(this).text();
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'filtro_ordenacao' , 'eventoRotulo' : opcaoClicada})
    });
    // filtro_conteudo
    $(document).on('click', '.sb-home-ead__learn-today__filters__a a', function(){
      var opcaoClicada = $(this).text();
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'filtro_conteudo' , 'eventoRotulo' : opcaoClicada})
    });
    // conteudo_verMais
    $(document).on('click', '.sb-components-card .sb-components-card__info a', function(){
      var tituloArtigo = $(this).parent().find('h3').text();
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'conteudo_verMais' , 'eventoRotulo' : tituloArtigo})
    });
    // bt_exibirMais
    $(document).on('click', '#showMore', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'bt_exibirMais' , 'eventoRotulo' : 'exibir'})
    });
    // banner_SliderTestemunhais
    $(document).on('click', '#sbCarouselHomeEadDepoimentos button.owl-prev', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'banner_SliderTestemunhais' , 'eventoRotulo' : 'seta_retrocede'})
    });
    $(document).on('click', '#sbCarouselHomeEadDepoimentos button.owl-next', function(){
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'banner_SliderTestemunhais' , 'eventoRotulo' : 'seta_avanca'})
    });
    // bt_faleEspecialista
    $(document).on('click', '.sb-chat-online a', function(){
      var linkSaida = $(this).attr('href');
      dataLayer.push({'event' : 'GAEvent' , 'eventoCategoria' : 'SebraeEAD_home' , 'eventoAcao' : 'bt_faleEspecialista' , 'eventoRotulo' : linkSaida})
    });
  
  }