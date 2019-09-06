function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }

  var defaultMapElements = {
    'textarea': gremlins.species.formFiller().fillTextElement,
    'input[type="text"]': gremlins.species.formFiller().fillTextElement,
    'input[type="password"]': gremlins.species.formFiller().fillTextElement/*,
   'input[type="number"]': fillNumberElement,
    'select': fillSelect,
    'input[type="radio"]': fillRadio,
    'input[type="checkbox"]': fillCheckbox,
    'input[type="email"]': fillEmail,
    'input:not([type])': gremlins.species.formFiller().fillTextElement*/
};

  var horde = window.gremlins.createHorde()
        //.gremlin(gremlins.species.formFiller().elementMapTypes(['input']))
        //.gremlin(gremlins.species.formFiller().elementMapTypes(['select']))
       // .gremlin(gremlins.species.clicker().clickTypes(['click']))
       .gremlin(gremlins.species.formFiller().elementMapTypes(defaultMapElements))
        .gremlin(gremlins.species.clicker().clickTypes(['click', 'click', 'click', 'click', 'click', 'click', 'dblclick', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseover', 'mouseover', 'mousemove', 'mouseout']))
       // .gremlin(gremlins.species.clicker().clickTypes(['click', 'click', 'click', 'click', 'click', 'click', 'dblclick', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseover', 'mouseover', 'mousemove', 'mouseout']))
        
       ;

  //var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.strategy(gremlins.strategies.distribution()
      .delay(10)
      .distribution([0.01,0.99])
    );


  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' '));
    });
  });

});