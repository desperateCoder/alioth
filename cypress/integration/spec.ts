describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('List of Custom ROMs')
  })
  describe('The application', () => {
    it('should hide items when searching for a term', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('mat-card').should('have.length', 3)
      cy.get('input').type('Baz')
      cy.get('mat-card').should('have.length', 1)
    })
    it('should display filters based on the data', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('mat-button-toggle').eq(0).should('have.text', '11')
      cy.get('mat-button-toggle').eq(1).should('have.text', '12')
    })
    it('should filter items when pressing a toggle button', () => {
      cy.intercept('GET', 'assets/data.json', sampleData)
      cy.visit('/')
      cy.get('mat-button-toggle').first().click()
      cy.get('mat-card').should('have.length', 2)
      cy.get('mat-card').eq(0).contains('Foo ROM')
      cy.get('mat-card').eq(1).contains('Baz OS')
    })
  })
})


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