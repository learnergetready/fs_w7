const user = {
  name: 'Don Testme',
  username: 'root',
  password: 'sekret'
}

const user2 = {
  name: 'Please Testme',
  username: 'wootwoot',
  password: 'mypassword'
}

const blog = {
  title: 'The Ultimate Blog',
  author: 'Teh Ultimate Poaster',
  url: 'getout!'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('[data-cy="username"]')
    cy.get('[data-cy="password"]')
    cy.get('[data-cy="login"]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy="username"]').type('root')
      cy.get('[data-cy="password"]').type('sekret')
      cy.get('[data-cy="login"]').click()

      cy.get('[data-cy="new blog"]')
      cy.get('[data-cy="log out"]')
      cy.contains('Don Testme logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy="username"]').type('wrongperson')
      cy.get('[data-cy="password"]').type('madeuppassword')
      cy.get('[data-cy="login"]').click()

      cy.contains('Wrong credentials')
      cy.get('[data-cy="username"]')
      cy.get('[data-cy="password"]')
      cy.get('[data-cy="login"]')

      cy.get('[data-cy="new blog"]').should('not.exist')
      cy.get('[data-cy="log out"]').should('not.exist')
      cy.contains('logged in').should('not.exist')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy="username"]').type('root')
      cy.get('[data-cy="password"]').type('sekret')
      cy.get('[data-cy="login"]').click()
    })

    it('A blog can be created', function() {
      cy.get('[data-cy="new blog"]').click()
      cy.get('[data-cy="blog-title"]').type(blog.title)
      cy.get('[data-cy="blog-author"]').type(blog.author)
      cy.get('[data-cy="blog-url"]').type(blog.url)
      cy.get('[data-cy="submit-blog"]').click()

      cy.get('.blog')
        .contains(blog.title)
        .contains(blog.author)
    })

    describe('When blog added', function() {
      beforeEach(function() {
        cy.get('[data-cy="new blog"]').click()
        cy.get('[data-cy="blog-title"]').type(blog.title)
        cy.get('[data-cy="blog-author"]').type(blog.author)
        cy.get('[data-cy="blog-url"]').type(blog.url)
        cy.get('[data-cy="submit-blog"]').click()
      })

      it('A blog can be liked', function() {
        cy.get('.blog')
          .contains(blog.title)
          .contains(blog.author)
        cy.get('[data-cy="view"]').click()
        cy.get('[data-cy="like"]').click()

        cy.get('.blog')
          .contains(blog.title)
          .contains(blog.author)
          .contains('likes: 1')
      })

      it('A blog can be removed by the user, who added it', function() {
        cy.get('[data-cy="view"]').click()
        cy.get('[data-cy="remove"]').click()

        cy.get('.blog').should('not.exist') //because it was the only blog
      })

      it('5.23 The blogs are sorted by likes', function() {
        cy.get('[data-cy="new blog"]').click()
        cy.get('[data-cy="blog-title"]').type('Second blog title')
        cy.get('[data-cy="blog-author"]').type('Second blog author')
        cy.get('[data-cy="blog-url"]').type('Second blog url')
        cy.get('[data-cy="submit-blog"]').click()
        cy.get('.blog').contains('Second blog title')
        cy.get('[data-cy="view"]').eq(0).click()
        cy.get('[data-cy="view"]').click()

        cy.get('.blog').contains(blog.title).as('blog1').find('[data-cy="like"]').as('like1')
        cy.get('.blog').contains('Second blog title').as('blog2').find('[data-cy="like"]').as('like2')

        cy.get('@like2').click()

        cy.get('.blog').eq(0).should('contain','Second blog title')

        cy.get('@like1').click()
        cy.get('@blog1').should('contain', 'likes: 1')
        cy.get('@like1').click()
        cy.get('@blog1').should('contain', 'likes: 2')
        cy.get('@like1').click()
        cy.get('@blog1').should('contain', 'likes: 3')

        cy.get('.blog').eq(0).should('contain',blog.title)
        cy.get('@like2').click()
        cy.get('@blog2').should('contain', 'likes: 2')
        cy.get('.blog').eq(0).should('contain',blog.title)
        cy.get('.blog').eq(1).should('contain','Second blog title')
      })

      describe('And logged in with as a different user', function() {
        beforeEach(function(){
          cy.get('[data-cy="log out"]').click()
          cy.visit('http://localhost:5173')

          cy.get('[data-cy="username"]').type(user2.username)
          cy.get('[data-cy="password"]').type(user2.password)
          cy.get('[data-cy="login"]').click()
        })

        it('Remove button is not showing, when another user created the blog', function() {
          cy.get('[data-cy="view"]').click()
          cy.get('[data-cy="remove"]').should('not.exist')
        })
      })
    })
  })
})