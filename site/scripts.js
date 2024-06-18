document.addEventListener('DOMContentLoaded', () => {
    const apiBaseUrl = 'http://localhost:3000/books';
  
    const booksList = document.getElementById('books');
    const addBookForm = document.getElementById('add-book-form');
  
    // Function to fetch and display all books
    async function fetchBooks() {
      try {
        const response = await fetch(apiBaseUrl);
        const books = await response.json();
        booksList.innerHTML = '';
        books.forEach(book => {
          const bookItem = document.createElement('li');
          bookItem.textContent = `${book.titulo} - ${book.editora}`;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Remover';
          deleteButton.addEventListener('click', () => deleteBook(book.id));
          bookItem.appendChild(deleteButton);
          booksList.appendChild(bookItem);
        });
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    }
  
    // Function to add a new book
    async function addBook(event) {
      event.preventDefault();
      const newBook = {
        titulo: document.getElementById('titulo').value,
        sinopse: document.getElementById('sinopse').value,
        editora: document.getElementById('editora').value,
        genero: document.getElementById('genero').value,
        preco_tabela: document.getElementById('preco_tabela').value,
        custo: document.getElementById('custo').value,
      };
  
      try {
        const response = await fetch(`${apiBaseUrl}/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBook),
        });
  
        if (response.ok) {
          fetchBooks();
          addBookForm.reset();
        } else {
          console.error('Erro ao adicionar livro:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao adicionar livro:', error);
      }
    }
  
    // Function to delete a book by ID
    async function deleteBook(id) {
      try {
        const response = await fetch(`${apiBaseUrl}/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          fetchBooks();
        } else {
          console.error('Erro ao remover livro:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao remover livro:', error);
      }
    }
  
    // Fetch books when the page loads
    fetchBooks();
  
    // Add event listener to the add book form
    addBookForm.addEventListener('submit', addBook);
  });