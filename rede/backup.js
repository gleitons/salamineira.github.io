  
  function criarCSV() {
      // Obtenha os dados do Local Storage
      const dadosArmazenados = JSON.parse(localStorage.getItem('empresasFavoritasPage'));
  
      // Verifique se há dados no Local Storage
      if (dadosArmazenados && dadosArmazenados.length > 0) {
          // Concatene os dados em uma única string CSV
          const csvData = dadosArmazenados.join('\n');
  
          // Crie um objeto Blob com os dados CSV
          const blob = new Blob([csvData], { type: 'text/csv' });
  
          // Crie um URL para o Blob
          const csvURL =  URL.createObjectURL(blob);
  
          // Crie um link de download
          const link = document.createElement('a');
          link.href =  csvURL;
          console.log(csvURL)
          link.download = 'backup-futuro-consultoria.csv';
  
          // Simule um clique no link para iniciar o download
          link.click();
      } else {
          console.log('Não há dados para exportar.');
      }
  }
  
  // Chame a função para criar o arquivo CSV
  //criarCSV();