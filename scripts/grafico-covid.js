function graficCovidLagoa(){
    const ctx = document.getElementById('myChart').getContext('2d');
        const labels = [
                covid_14_01_2021()[0],
                covid_12_02_2021()[0],
                covid_26_02_2021()[0],
                covid_03_03_2021()[0],
                covid_25_03_2021()[0],
                covid_06_04_2021()[0],
                covid_16_04_2021()[0],
                covid_13_05_2021()[0],
                covid_22_06_2021()[0],
                covid_01_07_2021()[0],
                covid_10_07_2021()[0],
                covid_13_07_2021()[0],
                covid_16_08_2021()[0],
                covid_24_08_2021()[0],
                covid_25_08_2021()[0],
                covid_27_08_2021()[0],
                covid_31_08_2021()[0],
                covid_10_09_2021()[0],
                covid_18_01_2022()[0],
                covid_19_01_2022()[0],
                covid_22_01_2022()[0],
                "covid_28_01_2022()[0]"

            ];

            const data = {
                labels: labels,
                datasets: [{
                label: 'ATIVOS',
                backgroundColor: 'rgb(223, 12, 12)',
                borderColor: 'rgb(255, 99, 132)',
                data: [covid_14_01_2021()[1], covid_12_02_2021()[1], covid_26_02_2021()[1], covid_03_03_2021()[1], covid_25_03_2021()[1], covid_06_04_2021()[1], covid_16_04_2021()[1], covid_13_05_2021()[1], covid_22_06_2021()[1], covid_01_07_2021()[1], covid_10_07_2021()[1] , covid_13_07_2021()[1], covid_16_08_2021()[1], covid_24_08_2021()[1],  covid_25_08_2021()[1], covid_27_08_2021()[1], covid_31_08_2021()[1], covid_10_09_2021()[1], covid_18_01_2022()[1], covid_19_01_2022()[1],covid_22_01_2022()[1],covid_28_01_2022()[1],"dsf"]
                },
                {
                label: 'CONFIRMADOS',
                backgroundColor: 'rgb(207, 64, 255)',
                borderColor: 'rgb(207, 64, 255)',
                data: [covid_14_01_2021()[3], covid_12_02_2021()[3], covid_26_02_2021()[3], covid_03_03_2021()[3], covid_25_03_2021()[3], covid_06_04_2021()[3], covid_16_04_2021()[3], covid_13_05_2021()[3], covid_22_06_2021()[3], covid_01_07_2021()[3], covid_10_07_2021()[3] , covid_13_07_2021()[3], covid_16_08_2021()[3], covid_24_08_2021()[3],  covid_25_08_2021()[3], covid_27_08_2021()[3], covid_31_08_2021()[3], covid_10_09_2021()[3], covid_18_01_2022()[3], covid_19_01_2022()[3],covid_22_01_2022()[3],covid_28_01_2022()[3],"dsf"]
                },
                {
                label: 'DESCARTADOS',
                backgroundColor: 'rgb(179, 182, 184)',
                borderColor: 'rgb(179, 182, 184)',
                data: [covid_14_01_2021()[2], covid_12_02_2021()[2], covid_26_02_2021()[2], covid_03_03_2021()[2], covid_25_03_2021()[2], covid_06_04_2021()[2], covid_16_04_2021()[2], covid_13_05_2021()[2], covid_22_06_2021()[2], covid_01_07_2021()[2], covid_10_07_2021()[2] , covid_13_07_2021()[2], covid_16_08_2021()[2], covid_24_08_2021()[2],  covid_25_08_2021()[2], covid_27_08_2021()[2], covid_31_08_2021()[2], covid_10_09_2021()[2],covid_18_01_2022()[2], covid_19_01_2022()[2],covid_22_01_2022()[2],covid_28_01_2022()[2],"dsf"]
                },
                {
                label: 'CURADOS',
                backgroundColor: 'rgb(116, 205, 255)',
                borderColor: 'rgb(116, 205, 255)',
                data: [covid_14_01_2021()[4], covid_12_02_2021()[4], covid_26_02_2021()[4], covid_03_03_2021()[4], covid_25_03_2021()[4], covid_06_04_2021()[4], covid_16_04_2021()[4], covid_13_05_2021()[4], covid_22_06_2021()[4], covid_01_07_2021()[4], covid_10_07_2021()[4] , covid_13_07_2021()[4], covid_16_08_2021()[4], covid_24_08_2021()[4],  covid_25_08_2021()[4], covid_27_08_2021()[4], covid_31_08_2021()[4], covid_10_09_2021()[4], covid_18_01_2022()[4],covid_19_01_2022()[4],covid_22_01_2022()[4],covid_28_01_2022()[4],"dsf"]
                },
                {
                label: 'ISOLAMENTO',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [covid_14_01_2021()[5], covid_12_02_2021()[5], covid_26_02_2021()[5], covid_03_03_2021()[5], covid_25_03_2021()[5], covid_06_04_2021()[5], covid_16_04_2021()[5], covid_13_05_2021()[5], covid_22_06_2021()[5], covid_01_07_2021()[5], covid_10_07_2021()[5] , covid_13_07_2021()[5], covid_16_08_2021()[5], covid_24_08_2021()[5],  covid_25_08_2021()[5], covid_27_08_2021()[5], covid_31_08_2021()[5], covid_10_09_2021()[5], covid_18_01_2022()[5],covid_19_01_2022()[5],covid_22_01_2022()[5],covid_28_01_2022()[5],"dsf"]
                },
                {
                label: 'OBITOS',
                backgroundColor: 'rgb(27, 22, 22)',
                borderColor: 'rgb(27, 22, 22)',
                data: [covid_14_01_2021()[6], covid_12_02_2021()[6], covid_26_02_2021()[6], covid_03_03_2021()[6], covid_25_03_2021()[6], covid_06_04_2021()[6], covid_16_04_2021()[6], covid_13_05_2021()[6], covid_22_06_2021()[6], covid_01_07_2021()[6], covid_10_07_2021()[6] , covid_13_07_2021()[6], covid_16_08_2021()[6], covid_24_08_2021()[6],  covid_25_08_2021()[6], covid_27_08_2021()[6], covid_31_08_2021()[6], covid_10_09_2021()[6], covid_18_01_2022()[6], covid_19_01_2022()[6],covid_22_01_2022()[6],covid_28_01_2022()[6],"dsf"]
                }, 
                {
                label: 'CURADOS',
                backgroundColor: 'rgb(117, 213, 139)',
                borderColor: 'rgb(117, 213, 139)',
                data: [covid_14_01_2021()[7], covid_12_02_2021()[7], covid_26_02_2021()[7], covid_03_03_2021()[7], covid_25_03_2021()[7], covid_06_04_2021()[7], covid_16_04_2021()[7], covid_13_05_2021()[7], covid_22_06_2021()[7], covid_01_07_2021()[7], covid_10_07_2021()[7] , covid_13_07_2021()[7], covid_16_08_2021()[7], covid_24_08_2021()[7],  covid_25_08_2021()[7], covid_27_08_2021()[7], covid_31_08_2021()[7], covid_10_09_2021()[7], covid_18_01_2022()[7], covid_19_01_2022()[7],covid_22_01_2022()[7],covid_28_01_2022()[7],"dsf"]
                }]
            };
            

            const config = {
                type: 'line',
                data: data,
                options: {}
              };
         
        
              <script>
              const myChart = new Chart(
                document.getElementById('myChart'),
                config
              );
            </script>
}