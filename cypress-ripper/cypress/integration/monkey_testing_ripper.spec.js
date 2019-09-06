
 //Posibles eventos
      /*    Hacer click en un link al azar
            Llenar un campo de texto al azar
            Seleccionar un combo al azar
            Hacer click en un botón al azar
            */
const   eventos = ['a', 'input[type="text"]', 'select','button'];
describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEventFunction(10); 
       // randomClick(10);

    })
})
/**
 * @param {*} monkeysLeft 
 */
function randomEventFunction(monkeysLeft) {
  
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    //Obtengo un evento aleatorio
    var evtPos=getRandomInt(0,eventos.length);

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        //selecciono el nombre del evento a buscar
        var component=eventos[evtPos];
        cy.get(component).then($components => {
            //de la cantidad de eventos obtengo uno
            var randomEvent = $components.get(getRandomInt(0, $components.length));
           //valido que el evento no este oculto y la pagina actual tenga uno
            if(!Cypress.dom.isHidden(randomEvent) && randomEvent) {
                console.log("--->"+monkeysLeft);
                //si input ponemos texto aleatorio
                if('input[type="text"]'===component){
                    cy.wrap(randomEvent).click().type('Un Texto X').click();
                }else 
                //hacemos click en link o buton
                if('a'===component || 'button'===component){
                    cy.wrap(randomEvent).click({force: true});
                }
                if('select'===component  && randomEvent.options){
                    //selecciono un opcion de un combo
                    var optionPos=getRandomInt(0, randomEvent.options.length);
                    var optionValue = randomEvent.options[optionPos].value;
                    cy.wrap(randomEvent).select(optionValue, { force: true });
                }
                
                monkeysLeft = monkeysLeft - 1;
            }
            //setTimeout(randomEvent, 1000, monkeysLeft);
            cy.wait(1000);
            randomEventFunction(monkeysLeft);
        });
    }   
}

function randomClick(monkeysLeft) {  
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            //setTimeout(randomClick, 1000, monkeysLeft);            
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
        console.log("--->"+monkeysLeft);
    }   
}