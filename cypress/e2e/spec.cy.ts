import { fakerEN as faker } from '@faker-js/faker';

describe('template spec', () => {
  it('passes', () => {
    /* 1 using filter */

    // cy.visit('https://example.cypress.io/commands/traversal');
    // cy.get('.traversal-nav>li').filter('.active').should('contain', 'About');

    /* 2  using type and fakerjs */

    // const firstname = faker.person.firstName();
    // const lastname = faker.person.lastName();
    // cy.visit('https://example.cypress.io/commands/actions');
    // cy.get("[for='fullName1']").next().type(`${firstname} ${lastname}`);

    /* 3 read JSON and adding faker add using write */

    // const name = faker.person.fullName();
    // const email = faker.internet.email();
    // const body = faker.lorem.paragraph();
    // cy.readFile('cypress/fixtures/example.json').then((obj) => {
    //   cy.log(JSON.stringify(obj));
    //   const newList = [...obj, { name, email, body }];
    //   cy.writeFile('cypress/fixtures/example.json', newList);
    // });

    /* 4  read/write csv*/

    //   const newUser = {
    //     name: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     phone: faker.phone.number({ style: 'international' }),
    //     address: `${faker.location.streetAddress()}`,
    //   };
    //   cy.readFile('cypress/fixtures/users.csv', 'utf8').then((csvContent) => {
    //     const rows = csvContent.split('\n');
    //     const newRow = `${newUser.name},${newUser.email},${newUser.phone},${newUser.address}`;
    //     rows.push(newRow);
    //     const updatedCsv = rows.join('\n');
    //     cy.writeFile('cypress/fixtures/users.csv', updatedCsv);
    //   });
    // });

    /* 5. reading file using methods defined in config.ts */

    // it('demonstrates custom file handling methods', () => {
    //   // Reading and writing JSON files
    //   const newJsonData = {
    //     name: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     body: faker.lorem.paragraph()
    //   };
    //   cy.task('readJSON', 'cypress/fixtures/example.json').then((jsonContent) => {
    //     const updatedJson = Array.isArray(jsonContent) ? [...jsonContent, newJsonData] : [newJsonData];
    //     cy.task('writeJSON', {
    //       filePath: 'cypress/fixtures/example.json',
    //       data: updatedJson
    //     });
    //   });
    //   // Reading and writing CSV files
    //   const newUser = {
    //     name: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     phone: faker.phone.number({ style: 'international' }),
    //     address: faker.location.streetAddress()
    //   };
    //   cy.task('readCSV', 'cypress/fixtures/users.csv').then((csvRows) => {
    //     const newRow = [newUser.name, newUser.email, newUser.phone, newUser.address];
    //     (csvRows as string[][]).push(newRow);
    //     cy.task('writeCSV', {
    //       filePath: 'cypress/fixtures/users.csv',
    //       data: csvRows
    //     });
    //   });

    /* 6. read and write methods without defining whole logic here */

    // const name = faker.person.fullName();
    // const email = faker.internet.email();
    // const body = faker.lorem.paragraph();
    // cy.readJSONFile('cypress/fixtures/example.json', { name, email, body });

    // const newUser = {
    //   name: faker.person.fullName(),
    //   email: faker.internet.email(),
    //   phone: faker.phone.number({ style: 'international' }),
    //   address: faker.location.streetAddress()
    // };
    // cy.readCSVFile('cypress/fixtures/users.csv', newUser);

    /* 7 using cy session for the website */
    // Using the custom loginSession command
    cy.loginSession();
  });
});
