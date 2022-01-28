describe('Custom ROM list', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    setLanguage('en')
    cy.contains('List of Custom ROMs')
  })
  describe('The ROM list', () => {
    it('should display filters based on the data', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('mat-button-toggle-group mat-button-toggle').eq(0).should('contain.text', '11')
      cy.get('mat-button-toggle-group mat-button-toggle').eq(1).should('contain.text', '12')
    })
    it('should hide items when searching for a term', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('app-rom').should('have.length', 3)
      cy.get('input').type('Baz')
      cy.get('app-rom').should('have.length', 1)
    })
    it('should filter items when pressing a toggle button', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('mat-button-toggle-group mat-button-toggle').first().click()
      cy.get('app-rom').should('have.length', 2)
      cy.get('app-rom').eq(0).contains('Foo ROM')
      cy.get('app-rom').eq(1).contains('Baz OS')
    })
    it('should display empty content views for blank categories', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      setLanguage('en')
      cy.get('app-rom-category-empty').should('have.length', 0)
      cy.get('input').type('Baz')
      cy.get('app-rom-category-empty').should('have.length', 1)
      cy.get('app-rom-category-empty').eq(0).contains('No ROM')
    })
  })
  xdescribe('Internationalization', () => {
    it('should change the app title and search placeholder', () => {
      cy.visit('/')
      setLanguage('en')
      cy.contains('List of Custom ROMs')
      cy.contains('Search')
      setLanguage('de')
      cy.contains('Liste von Custom ROMs')
      cy.contains('Suchen')
    })
    it('should preserve the language after navigation', () => {
      cy.visit('/')
      setLanguage('de')
      cy.get('[data-test="about-link"]').click()
      cy.contains('Änderungsprotokoll')
      setLanguage('en')
      cy.contains('Changelog')
      cy.get('[data-test="home-link"]').click()
      cy.contains('Search')
    })
  })
})

function setLanguage(lang: string) {
  cy.get('[data-test="preferences"]').click()
  cy.get('[data-test="configure-language"]').click()
  cy.get(`[data-test="language-${lang}"]`).eq(0).click()
  // https://stackoverflow.com/a/53859372
  cy.get('.cdk-overlay-backdrop').eq(0).click(-50, -50, { force: true })
}

const sampleData = [
  {
    "title": "Official ROMs",
    "roms": [
      {
        "name": "Foo ROM",
        "androidVersions": ["11"],
        "maintainer": [
          {
            "name": "foobian",
            "link": "https://example.com/maintainer/foobian"
          }
        ],
        "links": [
          {
            "url": "https://example.com/link/foobian",
            "text": "Foobian Link"
          }
        ]
      },
      {
        "name": "Bar ROM",
        "androidVersions": ["12"],
        "maintainer": [
          {
            "name": "barbarian",
            "link": "https://example.com/maintainer/barbarian"
          }
        ],
        "links": [
          {
            "url": "https://example.com/links/barbarian",
            "text": "Barbarian Link"
          }
        ]
      }
    ]
  },
  {
    "title": "Other ROMs",
    "roms": [
      {
        "name": "Baz OS",
        "androidVersions": ["11"],
        "maintainer": [
          {
            "name": "bazi",
            "link": "https://example.com/maintainer/bazi"
          },
          {
            "name": "bazi2"
          },
          {
            "name": "bazi3",
            "link": "https://example.com/maintainer/bazi3"
          }
        ],
        "links": [
          {
            "url": "https://example.com/links/bazi",
            "text": "Bazi Link"
          },
          {
            "url": "https://example.com/links/bazi2",
            "text": "Bazi 2 Link"
          }
        ]
      }
    ]
  }
]