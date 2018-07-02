import React from 'react';

export default () => {
  // polyfill
  if (!String.prototype.startsWith) {
    // String.prototype.startsWith = function(search, pos) {
    //   return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    // };
  }

  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value(target, firstSource) {
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        const to = Object(target);
        for (let i = 1; i < arguments.length; i++) {
          let nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);

          const keysArray = Object.keys(Object(nextSource));
          for (
            let nextIndex = 0, len = keysArray.length;
            nextIndex < len;
            nextIndex++
          ) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      },
    });
  }

  // Testing
  function findGetParameter(parameterName) {
    let result = null,
      tmp = [];
    window.location.search
      .substr(1)
      .split('&')
      .forEach(item => {
        tmp = item.split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  const groupIdRegex = /nbianchi-(\d)(?:_(\d))?/;
  const bloccoIdRegex = /(\d+(?:\.\d+)?)(?:-(\w+))?/;
  const groupsSelector = '#logo > svg > g';
  const bianco = '#ffffff';
  const colori = [
    '#7ba97d',
    '#6d7eb0',
    '#e6b041',
    '#b61351',
    '#ca4f24',
    '#cd8fa5',
    '#a6ba66',
    '#585858',
  ];
  const transizione = {
    transitionDuration: findGetParameter('transitionDuration') || '250ms,250ms',
    transitionProperty: 'fill,stroke',
    transitionTimingFunction:
      findGetParameter('transitionTimingFunction') || 'ease-in,ease-in',
    transitionDelay: findGetParameter('transitionDelay') || '1000', // ms
  };

  function decodebloccoId(element, id) {
    let m;
    id = id.replace(`${element.id}-`, '');
    if ((m = bloccoIdRegex.exec(id)) !== null) {
      return { id: parseFloat(m[1]), options: [m[2]] };
    }
  }

  function decodegroupId(id) {
    let m;
    if ((m = groupIdRegex.exec(id)) !== null) {
      if (m[2]) {
        return [m[1], m[2]];
      }
      return [m[1]];
    }
  }

  function setTransition(blocchi) {
    const colorSorted = [bianco];
    // let ind;
    // intervalloColori
    blocchi.forEach(blocco => {
      if (!blocco.colore) return;
      let ind = colorSorted.indexOf(blocco.colore);
      if (ind === -1) {
        colorSorted.push(blocco.colore);
        ind = colorSorted.length - 1;
      }
      blocco.blocco.style.transitionDuration = transizione.transitionDuration;
      blocco.blocco.style.transitionProperty = transizione.transitionProperty;
      blocco.blocco.style.transitionTimingFunction =
        transizione.transitionTimingFunction;
      blocco.blocco.style.transitionDelay = `${ind *
        transizione.transitionDelay}ms`;
    });
    // console.log(colorSorted);
  }

  function colora(blocchi) {
    setTimeout(() => {
      // Non va messo come delay css, non funziona altrimenti
      blocchi.forEach(blocco => {
        blocco.blocco.style.fill = blocco.colore;
        blocco.blocco.style.stroke = blocco.colore;
      });
    }, transizione.transitionDelay);
  }

  function getBlocchi(element, nbianchi) {
    // Troviamo tutti i blocchi e salviamoli in un dict
    const blocchi = [];
    [].slice.call(element.childNodes).forEach((blocco, i) => {
      if (blocco.id && blocco.id.startsWith(element.id)) {
        blocchi.push(
          Object.assign(
            { blocco, colore: undefined },
            decodebloccoId(element, blocco.id)
          )
        );
      }
    });

    // Ordiniamo i blochi per id
    blocchi.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    // Quanti blocchi bianchi facciamo per questo pezzo?
    nbianchi = nbianchi[Math.floor(Math.random() * nbianchi.length)];

    // Troviamo i blocchi da colorare in bianco, non devono essere adiacenti
    while (nbianchi !== 0) {
      const bloccoId = Math.floor(Math.random() * blocchi.length);
      if (blocchi[bloccoId].options.indexOf('nobianco') !== -1) continue;
      if (blocchi[bloccoId].colore === bianco) continue;
      if (bloccoId + 1 in blocchi && blocchi[bloccoId + 1].colore === bianco)
        continue;
      if (bloccoId - 1 in blocchi && blocchi[bloccoId - 1].colore === bianco)
        continue;
      blocchi[bloccoId].colore = bianco;
      nbianchi--;
    }

    // Ragruppiamo gli indici dei blocchi continui
    let gruppi = [[]];
    let last = 0;
    blocchi.forEach((blocco, ind) => {
      if (blocco.colore === bianco) {
        if (
          gruppi[last].length > 0 &&
          ind !== 0 &&
          ind !== blocchi.length - 1
        ) {
          gruppi.push([]);
          last++;
        }
      } else {
        gruppi[last].push(ind);
      }
    });

    // Ne estriamo lenght-1 gruppi di blocchi casualmente (uno rimane grigio)
    gruppi = gruppi
      .slice(0)
      .sort(() => 0.5 - Math.random())
      .slice(0, gruppi.length - 1);

    // Estriamo gruppi.length colori e assegniamo un colore ai blocchi
    const coloriXgruppi = colori
      .slice(0)
      .sort(() => 0.5 - Math.random())
      .slice(0, gruppi.length);

    gruppi.forEach((gruppo, ind) => {
      gruppo.forEach(bloccoInd => {
        blocchi[bloccoInd].colore = coloriXgruppi[ind];
      });
    });

    return blocchi;
  }

  function main() {
    const groups = document.querySelectorAll(groupsSelector);
    let blocchi = [];
    [].slice.call(groups).forEach(group => {
      const nbianchi = decodegroupId(group.id);
      if (nbianchi) {
        [].slice.call(group.querySelectorAll('g')).forEach(element => {
          blocchi = blocchi.concat(getBlocchi(element, nbianchi));
        });
      }
    });

    setTransition(blocchi);
    colora(blocchi);
  }

  (function ready(fn) {
    if (
      document.attachEvent
        ? document.readyState === 'complete'
        : document.readyState !== 'loading'
    ) {
      main();
    } else {
      document.addEventListener('DOMContentLoaded', main);
    }
  })();

  return (
    <div id="logo">
      <svg
        viewBox="0 0 307.51822 67.85018"
        style={{
          fill: '#585858',
          stroke: '#585858',
          strokeMiterlimit: 10,
          strokeWdth: '0.65px',
        }}
      >
        <g id="nbianchi-2">
          <g id="abaco">
            <path
              id="abaco-15-nobianco"
              className="cls-1"
              d="M72.1087,4.49773H76.368V.133H72.1087Z"
            />
            <rect
              id="abaco-14"
              className="cls-1"
              x="67.84936"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-13"
              className="cls-1"
              x="63.59002"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-12"
              className="cls-1"
              x="59.33068"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-11"
              className="cls-1"
              x="55.07134"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-10"
              className="cls-1"
              x="50.81199"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-9"
              className="cls-1"
              x="46.55265"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-8"
              className="cls-1"
              x="42.29331"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-7"
              className="cls-1"
              x="38.03397"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-6"
              className="cls-1"
              x="33.77463"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-5"
              className="cls-1"
              x="29.51528"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-4"
              className="cls-1"
              x="25.25594"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-3"
              className="cls-1"
              x="20.9966"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-2"
              className="cls-1"
              x="16.73726"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <rect
              id="abaco-1"
              className="cls-1"
              x="12.47792"
              y="0.13296"
              width="4.25934"
              height="4.36477"
            />
            <path
              id="abaco-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M12.47792.133H8.21858V4.49773h4.25934Z"
            />
          </g>

          <g id="L">
            <path
              className="cls-1"
              d="M101.27522,11.99456c0-2.70651.31332-4.51067,1.421-5.662l-11.25372-.095c1.04081,1.10377,1.332,2.86041,1.332,5.56693Z"
              id="L-1"
            />
            <path
              className="cls-1"
              d="M101.27525,62.027V55.508l-8.50074.633c0,2.70655-.29126,4.4632-1.332,5.567s-2.83117,1.55469-5.82946,1.64972V66.6797h20.76361L107.7194,62.027Z"
              data-name="nobianco"
              id="L-6-nobianco"
            />
            <polygon
              className="cls-1"
              id="L-5"
              points="101.275 55.508 101.275 45.412 92.775 46.823 92.775 56.141 101.275 55.508"
            />
            <polygon
              className="cls-1"
              id="L-3"
              points="101.275 37.011 101.275 22.656 92.775 22.192 92.775 33.973 101.275 37.011"
            />
            <polygon
              className="cls-1"
              id="L-7"
              points="114.164 62.027 107.719 62.027 106.377 66.68 113.935 66.68 114.164 62.027"
            />
            <path
              className="cls-1"
              d="M124.54533,50.63508c-.89514,4.27143-1.85718,7.11939-3.41211,8.89954s-3.70276,2.49237-6.96961,2.49237L113.935,66.6797H127.1403l.67077-8.02234.67084-8.02228Z"
              data-name="nobianco"
              id="L-8-nobianco"
            />
            <polygon
              className="cls-1"
              id="L-4"
              points="101.275 45.412 101.275 37.011 92.775 33.973 92.775 46.823 101.275 45.412"
            />
            <polygon
              className="cls-1"
              id="L-2"
              points="101.275 22.656 101.275 11.995 92.775 11.804 92.775 22.192 101.275 22.656"
            />
            <path
              className="cls-1"
              d="M102.69619,6.33259c1.10765-1.15129,3.00962-1.64971,6.18694-1.74475V1.26574H85.613v3.3221c2.9983.095,4.78867.54594,5.82947,1.64971Z"
              data-name="nobianco"
              id="L-0.5-nobianco"
            />
          </g>
          <g id="I">
            <rect
              className="cls-1"
              height="11.43942"
              id="I-3"
              width="8.50085"
              x="198.66247"
              y="33.97273"
            />
            <rect
              className="cls-1"
              height="11.78119"
              id="I-2"
              width="8.50085"
              x="198.66247"
              y="22.19154"
            />
            <path
              className="cls-1"
              d="M191.50108,1.2657V4.58784c2.99823.095,4.78857.5459,5.82934,1.64972s1.332,2.86035,1.332,5.5669h8.50086c0-2.70655.29065-4.46314,1.33087-5.5669s2.83-1.55468,5.82819-1.64972V1.2657Z"
              data-name="nobianco"
              id="I-0-nobianco"
            />
            <path
              className="cls-1"
              d="M208.49418,61.7079c-1.04022-1.10376-1.33087-2.86041-1.33087-5.567h-8.50086c0,2.70655-.2912,4.4632-1.332,5.567s-2.83111,1.55469-5.82934,1.64972V66.6797h22.82129V63.35762C211.32414,63.26259,209.5344,62.81166,208.49418,61.7079Z"
              data-name="nobianco"
              id="I-5-nobianco"
            />
            <rect
              className="cls-1"
              height="10.72883"
              id="I-4"
              width="8.50085"
              x="198.66247"
              y="45.41215"
            />
            <rect
              className="cls-1"
              height="10.38706"
              id="I-1"
              width="8.50085"
              x="198.66247"
              y="11.80448"
            />
          </g>
        </g>
        <g id="nbianchi-3">
          <g id="S2">
            <path
              className="cls-1"
              d="M268.01663,18.63851a19.66559,19.66559,0,0,0,.89652,6.15677l7.06412-4.64184a13.83581,13.83581,0,0,1-.62241-4.45684Z"
              id="S2-15"
            />
            <path
              className="cls-1"
              d="M286.80867,4.58761a17.00828,17.00828,0,0,1,5.39044.75212l6.38076-3.71918A27.906,27.906,0,0,0,293.91523.53449,40.39005,40.39005,0,0,0,287.97561.125Z"
              id="S2-20"
            />
            <path
              className="cls-1"
              d="M292.19911,5.33973a9.00254,9.00254,0,0,1,3.5607,2.13177L304.889,4.96778a19.49621,19.49621,0,0,0-2.71823-1.79825,21.4604,21.4604,0,0,0-3.59085-1.549Z"
              id="S2-21"
            />
            <path
              className="cls-1"
              d="M295.7598,7.47151a9.86809,9.86809,0,0,1,2.15082,3.32446,20.33884,20.33884,0,0,1,1.16077,4.33039H304.889V4.96779Z"
              data-name="nobianco"
              id="S2-22-nobianco"
            />
            <path
              className="cls-1"
              d="M275.35486,15.6966a13.02173,13.02173,0,0,1,.79564-4.66l-6.76459.1438a19.96391,19.96391,0,0,0-1.36928,7.45812Z"
              id="S2-16"
            />
            <path
              className="cls-1"
              d="M276.1505,11.03659a9.52,9.52,0,0,1,2.28056-3.4938l-5.09978-2.21915a16.542,16.542,0,0,0-3.94537,5.85675Z"
              id="S2-17"
            />
            <path
              className="cls-1"
              d="M278.43106,7.54279A9.9271,9.9271,0,0,1,282.037,5.34864l-2.42789-3.8527a17.81507,17.81507,0,0,0-6.2778,3.8277Z"
              id="S2-18"
            />
            <path
              className="cls-1"
              d="M282.037,5.34864a14.20931,14.20931,0,0,1,4.7717-.761L287.97561.125a24.47372,24.47372,0,0,0-8.36653,1.37094Z"
              id="S2-19"
            />
            <path
              className="cls-1"
              d="M268.91315,24.79528a14.21322,14.21322,0,0,0,2.6502,4.78562l6.3538-6.28831a7.94143,7.94143,0,0,1-1.93988-3.13915Z"
              id="S2-14"
            />
            <path
              className="cls-1"
              d="M271.56335,29.5809a16.97147,16.97147,0,0,0,4.34481,3.61071l5.37533-7.61484a12.33061,12.33061,0,0,1-3.36634-2.28418Z"
              id="S2-13"
            />
            <path
              className="cls-1"
              d="M275.90816,33.19161a29.42115,29.42115,0,0,0,5.98035,2.632l4.29676-8.35495a38.07537,38.07537,0,0,1-4.90178-1.89192Z"
              id="S2-12"
            />
            <polygon
              className="cls-1"
              id="S2-11"
              points="281.889 35.824 288.064 37.817 292.449 29.462 286.185 27.469 281.889 35.824"
            />
            <path
              className="cls-1"
              d="M288.06411,37.81733a39.9265,39.9265,0,0,1,5.2776,2.03424l5.10441-7.82251a30.80565,30.80565,0,0,0-5.99674-2.56668Z"
              id="S2-10"
            />
            <path
              className="cls-1"
              d="M293.34171,39.85157a12.52859,12.52859,0,0,1,3.58322,2.488l6.25127-6.587a19.23616,19.23616,0,0,0-4.73008-3.72357Z"
              id="S2-9"
            />
            <path
              className="cls-1"
              d="M296.92493,42.33962a8.66888,8.66888,0,0,1,2.03946,3.50257l7.31444-4.97723a15.51623,15.51623,0,0,0-3.10263-5.11233Z"
              id="S2-8"
            />
            <path
              className="cls-1"
              d="M298.96439,45.84219a16.981,16.981,0,0,1,.64635,5.07783l7.78248-3.3221a19.32563,19.32563,0,0,0-1.11439-6.733Z"
              id="S2-7"
            />
            <path
              className="cls-1"
              d="M299.61074,50.92a15.984,15.984,0,0,1-.6967,4.89154l7.02494.21834a23.18091,23.18091,0,0,0,1.45424-8.432Z"
              id="S2-6"
            />
            <path
              className="cls-1"
              d="M298.914,55.81156a10.15593,10.15593,0,0,1-2.25766,3.91266l5.00939,2.63689A16.76654,16.76654,0,0,0,305.939,56.0299Z"
              id="S2-5"
            />
            <path
              className="cls-1"
              d="M296.65638,59.72422a20.50424,20.50424,0,0,1-4.46628,2.73131l2.51776,3.887a18.83608,18.83608,0,0,0,6.95791-3.98138Z"
              id="S2-4"
            />
            <path
              className="cls-1"
              d="M292.1901,62.45553a18.56626,18.56626,0,0,1-5.73731.80463l-.7934,4.46217a29.97631,29.97631,0,0,0,9.04847-1.37984Z"
              id="S2-3"
            />
            <path
              className="cls-1"
              d="M286.45279,63.26016l-.7934,4.46217c-.15254.00176-4.92868-.18731-6.83746-.50636a31.92478,31.92478,0,0,1-5.11131-1.28356l6.76785-3.4555A19.52448,19.52448,0,0,0,286.45279,63.26016Z"
              id="S2-2"
            />
            <path
              className="cls-1"
              d="M280.47847,62.47691l-6.76785,3.4555a28.73542,28.73542,0,0,1-3.95382-1.693,29.13717,29.13717,0,0,1-2.90509-1.73736l9.73371-2.3747A9.17179,9.17179,0,0,0,280.47847,62.47691Z"
              id="S2-1"
            />
            <path
              className="cls-1"
              d="M274.26969,56.21156a27.51236,27.51236,0,0,1-1.24237-5.48163h-6.1756V62.502l9.73371-2.3747A10.78647,10.78647,0,0,1,274.26969,56.21156Z"
              data-name="nobianco"
              id="S2-0.5-nobianco"
            />
          </g>
          <g id="S1">
            <path
              className="cls-1"
              d="M223.21275,18.63851a19.66559,19.66559,0,0,0,.89652,6.15677l7.06412-4.64184a13.83581,13.83581,0,0,1-.62241-4.45684Z"
              id="S1-15"
            />
            <path
              className="cls-1"
              d="M242.00479,4.58761a17.00828,17.00828,0,0,1,5.39044.75212L253.776,1.62055A27.90623,27.90623,0,0,0,249.11135.53449,40.39005,40.39005,0,0,0,243.17173.125Z"
              id="S1-20"
            />
            <path
              className="cls-1"
              d="M247.39523,5.33973a9.00254,9.00254,0,0,1,3.5607,2.13177l9.12914-2.50372a19.49681,19.49681,0,0,0-2.71823-1.79825,21.4604,21.4604,0,0,0-3.59085-1.549Z"
              id="S1-21"
            />
            <path
              className="cls-1"
              d="M250.95591,7.47151a9.86733,9.86733,0,0,1,2.15082,3.32446,20.33943,20.33943,0,0,1,1.16077,4.33039h5.81756V4.96779Z"
              data-name="nobianco"
              id="S1-22-nobianco"
            />
            <path
              className="cls-1"
              d="M230.551,15.6966a13.02173,13.02173,0,0,1,.79564-4.66l-6.7646.1438a19.96411,19.96411,0,0,0-1.36927,7.45812Z"
              id="S1-16"
            />
            <path
              className="cls-1"
              d="M231.34662,11.03659a9.52,9.52,0,0,1,2.28056-3.4938L228.5274,5.32364a16.54215,16.54215,0,0,0-3.94538,5.85675Z"
              id="S1-17"
            />
            <path
              className="cls-1"
              d="M233.62718,7.54279a9.9271,9.9271,0,0,1,3.60591-2.19415l-2.42789-3.8527a17.81507,17.81507,0,0,0-6.2778,3.8277Z"
              id="S1-18"
            />
            <path
              className="cls-1"
              d="M237.23309,5.34864a14.20931,14.20931,0,0,1,4.7717-.761L243.17173.125a24.47372,24.47372,0,0,0-8.36653,1.37094Z"
              id="S1-19"
            />
            <path
              className="cls-1"
              d="M224.10927,24.79528a14.21288,14.21288,0,0,0,2.6502,4.78562l6.3538-6.28831a7.94143,7.94143,0,0,1-1.93988-3.13915Z"
              id="S1-14"
            />
            <path
              className="cls-1"
              d="M226.75947,29.5809a16.97142,16.97142,0,0,0,4.3448,3.61071l5.37534-7.61484a12.33046,12.33046,0,0,1-3.36634-2.28418Z"
              id="S1-13"
            />
            <path
              className="cls-1"
              d="M231.10427,33.19161a29.42165,29.42165,0,0,0,5.98035,2.632l4.29677-8.35495a38.07537,38.07537,0,0,1-4.90178-1.89192Z"
              id="S1-12"
            />
            <polygon
              className="cls-1"
              id="S1-11"
              points="237.085 35.824 243.26 37.817 247.645 29.462 241.381 27.469 237.085 35.824"
            />
            <path
              className="cls-1"
              d="M243.26023,37.81733a39.927,39.927,0,0,1,5.2776,2.03424l5.1044-7.82251a30.80529,30.80529,0,0,0-5.99673-2.56668Z"
              id="S1-10"
            />
            <path
              className="cls-1"
              d="M248.53783,39.85157a12.52859,12.52859,0,0,1,3.58322,2.488l6.25127-6.587a19.236,19.236,0,0,0-4.73009-3.72357Z"
              id="S1-9"
            />
            <path
              className="cls-1"
              d="M252.12105,42.33962a8.66888,8.66888,0,0,1,2.03946,3.50257L261.475,40.865a15.51623,15.51623,0,0,0-3.10263-5.11233Z"
              id="S1-8"
            />
            <path
              className="cls-1"
              d="M254.16051,45.84219a16.981,16.981,0,0,1,.64635,5.07783l7.78248-3.3221a19.32563,19.32563,0,0,0-1.11439-6.733Z"
              id="S1-7"
            />
            <path
              className="cls-1"
              d="M254.80686,50.92a15.984,15.984,0,0,1-.6967,4.89154l7.02494.21834a23.18091,23.18091,0,0,0,1.45424-8.432Z"
              id="S1-6"
            />
            <path
              className="cls-1"
              d="M254.11016,55.81156a10.15593,10.15593,0,0,1-2.25766,3.91266l5.00939,2.63689a16.76654,16.76654,0,0,0,4.27321-6.33121Z"
              id="S1-5"
            />
            <path
              className="cls-1"
              d="M251.8525,59.72422a20.50424,20.50424,0,0,1-4.46628,2.73131l2.51776,3.887a18.83616,18.83616,0,0,0,6.95791-3.98138Z"
              id="S1-4"
            />
            <path
              className="cls-1"
              d="M247.38622,62.45553a18.56626,18.56626,0,0,1-5.73731.80463l-.7934,4.46217a29.97631,29.97631,0,0,0,9.04847-1.37984Z"
              id="S1-3"
            />
            <path
              className="cls-1"
              d="M241.64891,63.26016l-.7934,4.46217c-.15255.00176-4.92868-.18731-6.83746-.50636a31.92478,31.92478,0,0,1-5.11131-1.28356l6.76785-3.4555A19.52448,19.52448,0,0,0,241.64891,63.26016Z"
              id="S1-2"
            />
            <path
              className="cls-1"
              d="M235.67459,62.47691l-6.76785,3.4555a28.73542,28.73542,0,0,1-3.95382-1.693,29.13717,29.13717,0,0,1-2.90509-1.73736l9.73371-2.3747A9.17179,9.17179,0,0,0,235.67459,62.47691Z"
              id="S1-1"
            />
            <path
              className="cls-1"
              d="M229.4658,56.21156a27.51655,27.51655,0,0,1-1.24237-5.48163h-6.1756V62.502l9.7337-2.3747A10.78743,10.78743,0,0,1,229.4658,56.21156Z"
              data-name="nobianco"
              id="S1-0.5-nobianco"
            />
          </g>
          <g id="U">
            <path
              className="cls-1"
              d="M148.91011,66.332a30.73359,30.73359,0,0,0,9.72242,1.39318l1.25314-5.69815a21.11325,21.11325,0,0,1-7.19274-1.04275Z"
              id="U-9"
            />
            <path
              className="cls-1"
              d="M158.63253,67.72518a28.34025,28.34025,0,0,0,8.973-1.28328l-1.39017-5.35518a18.516,18.516,0,0,1-6.32972.94031Z"
              id="U-10"
            />
            <path
              className="cls-1"
              d="M167.60556,66.4419a16.19656,16.19656,0,0,0,6.56482-3.99824L170.456,58.135a9.50847,9.50847,0,0,1-4.24056,2.95177Z"
              id="U-11"
            />
            <path
              className="cls-1"
              d="M152.69293,60.98428a9.84755,9.84755,0,0,1-4.56606-3.2411l-6.11976,4.46288a17.46821,17.46821,0,0,0,6.903,4.12594Z"
              id="U-8"
            />
            <path
              className="cls-1"
              d="M174.17038,62.44366a17.246,17.246,0,0,0,4.031-6.93573l-5.36733-2.53242A12.75387,12.75387,0,0,1,170.456,58.135Z"
              id="U-12"
            />
            <path
              className="cls-1"
              d="M148.12687,57.74318a13.6913,13.6913,0,0,1-2.40107-5.60876L137.89,55.42774a17.1175,17.1175,0,0,0,4.11716,6.77832Z"
              id="U-7"
            />
            <path
              className="cls-1"
              d="M178.20138,55.50793A33.11574,33.11574,0,0,0,179.573,45.41215h-5.99658a32.741,32.741,0,0,1-.74232,7.56336Z"
              id="U-13"
            />
            <path
              className="cls-1"
              d="M145.7258,52.13442a39.408,39.408,0,0,1-.69776-8.14569l-8.503,2.08873A29.16412,29.16412,0,0,0,137.89,55.42774Z"
              id="U-6"
            />
            <rect
              className="cls-1"
              height="8.40192"
              id="U-14"
              width="5.99659"
              x="173.57637"
              y="37.01024"
            />
            <polygon
              className="cls-1"
              id="U-5"
              points="145.028 43.989 145.028 35.943 136.525 37.509 136.525 46.077 145.028 43.989"
            />
            <rect
              className="cls-1"
              height="8.40192"
              id="U-15"
              width="5.99659"
              x="173.57637"
              y="28.60832"
            />
            <polygon
              className="cls-1"
              id="U-4"
              points="145.028 35.943 145.028 27.897 136.525 28.941 136.525 37.509 145.028 35.943"
            />
            <rect
              className="cls-1"
              height="8.40192"
              id="U-16"
              width="5.99659"
              x="173.57637"
              y="20.2064"
            />
            <polygon
              className="cls-1"
              id="U-3"
              points="145.028 27.897 145.028 19.851 136.525 20.373 136.525 28.941 145.028 27.897"
            />
            <rect
              className="cls-1"
              height="8.40192"
              id="U-17"
              width="5.99659"
              x="173.57637"
              y="11.80448"
            />
            <polygon
              className="cls-1"
              id="U-2"
              points="145.028 19.851 145.028 11.804 136.525 11.804 136.525 20.373 145.028 19.851"
            />
            <path
              className="cls-1"
              d="M179.573,11.80448a18.33033,18.33033,0,0,1,.239-3.3845H173.294a15.5849,15.5849,0,0,1,.28233,3.3845Z"
              id="U-18"
            />
            <path
              className="cls-1"
              d="M145.028,11.80448a15.56872,15.56872,0,0,1,.28267-3.3845h-9.05406a16.62616,16.62616,0,0,1,.26838,3.3845Z"
              id="U-1"
            />
            <path
              className="cls-1"
              d="M179.812,8.42a4.67445,4.67445,0,0,1,.93547-2.18243A3.9557,3.9557,0,0,1,182.707,5.03442a13.16375,13.16375,0,0,1,3.31114-.44658V1.26574H165.97076v3.3221a18.15771,18.15771,0,0,1,3.90651.44658,4.8548,4.8548,0,0,1,2.31241,1.20313A4.355,4.355,0,0,1,173.294,8.42Z"
              data-name="nobianco"
              id="U-19-nobianco"
            />
            <path
              className="cls-1"
              d="M145.31071,8.42a4.35511,4.35511,0,0,1,1.10511-2.18243A4.858,4.858,0,0,1,148.729,5.03442a18.16356,18.16356,0,0,1,3.90693-.44658V1.26574H129.81236v3.3221a13.91494,13.91494,0,0,1,3.39028.44658A4.23974,4.23974,0,0,1,135.25,6.23755,4.629,4.629,0,0,1,136.25665,8.42Z"
              data-name="nobianco"
              id="U-0.5-nobianco"
            />
          </g>
        </g>
        <g id="nobianchi">
          <path
            id="abaco2"
            className="cls-1"
            d="M22.2287,8.56642v4.36474H61.51445V8.56642Z"
          />
        </g>
        <g data-name="nbianchi-2;3" id="nbianchi-1_2">
          <g id="scanalat1">
            <rect
              id="scanalat1-10-nobianco"
              data-name="nobianco"
              className="cls-1"
              x="26.56193"
              y="17.62524"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-9"
              className="cls-1"
              x="26.56193"
              y="22.00204"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-8"
              className="cls-1"
              x="26.56193"
              y="26.37883"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-7"
              className="cls-1"
              x="26.56193"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-6"
              className="cls-1"
              x="26.56193"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-5"
              className="cls-1"
              x="26.56193"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-4"
              className="cls-1"
              x="26.56193"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-3"
              className="cls-1"
              x="26.56193"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-2"
              className="cls-1"
              x="26.56193"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat1-1"
              className="cls-1"
              x="26.56193"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="scanalat1-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M26.56193,61.39321V65.77h4.48513v-4.3768Z"
            />
          </g>
          <g id="scanalat2">
            <rect
              id="scanalat2-10-nobianco"
              data-name="nobianco"
              className="cls-1"
              x="35.34028"
              y="17.62524"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-9"
              className="cls-1"
              x="35.34028"
              y="22.00204"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-8"
              className="cls-1"
              x="35.34028"
              y="26.37883"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-7"
              className="cls-1"
              x="35.34028"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-6"
              className="cls-1"
              x="35.34028"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-5"
              data-name="scanalat2-5"
              className="cls-1"
              x="35.34028"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-4"
              className="cls-1"
              x="35.34028"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-3"
              className="cls-1"
              x="35.34028"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-2"
              className="cls-1"
              x="35.34028"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat2-1"
              className="cls-1"
              x="35.34028"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="scanalat2-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M35.34028,61.39321V65.77h4.48513v-4.3768Z"
            />
          </g>
          <g id="scanalat3">
            <rect
              id="scanalat3-10-nobianco"
              data-name="nobianco"
              className="cls-1"
              x="44.11508"
              y="17.62524"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-9"
              className="cls-1"
              x="44.11508"
              y="22.00204"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-8"
              className="cls-1"
              x="44.11508"
              y="26.37883"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-7"
              className="cls-1"
              x="44.11508"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-6"
              className="cls-1"
              x="44.11508"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-5"
              className="cls-1"
              x="44.11508"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-4"
              className="cls-1"
              x="44.11508"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-3"
              className="cls-1"
              x="44.11508"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-2"
              className="cls-1"
              x="44.11508"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat3-1"
              className="cls-1"
              x="44.11508"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="scanalat3-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M44.11508,61.39321V65.77h4.48513v-4.3768Z"
            />
          </g>

          <g id="scanalat4">
            <rect
              id="scanalat4-10-nobianco"
              data-name="nobianco"
              className="cls-1"
              x="52.82876"
              y="17.62524"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-9"
              data-name="scanalat4-9"
              className="cls-1"
              x="52.82876"
              y="22.00204"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-8"
              data-name="scanalat4-8"
              className="cls-1"
              x="52.82876"
              y="26.37883"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-7"
              data-name="scanalat4-7"
              className="cls-1"
              x="52.82876"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-6"
              data-name="scanalat4-6"
              className="cls-1"
              x="52.82876"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-5"
              data-name="scanalat4-5"
              className="cls-1"
              x="52.82876"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-4"
              data-name="scanalat4-4"
              className="cls-1"
              x="52.82876"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-3"
              data-name="scanalat4-3"
              className="cls-1"
              x="52.82876"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-2"
              data-name="scanalat4-2"
              className="cls-1"
              x="52.82876"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="scanalat4-1"
              data-name="scanalat4-1"
              className="cls-1"
              x="52.82876"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="scanalat4-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M52.82876,61.39321V65.77h4.48513v-4.3768Z"
            />
          </g>
          <g id="voluta2">
            <path
              id="voluta2-9-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M62.23658,26.37883a30.77062,30.77062,0,0,1,.55579-5.78924,11.59479,11.59479,0,0,1,10.85048-8.37175,10.04353,10.04353,0,0,1,9.04371,5.64427,9.50734,9.50734,0,0,1,.49357,7.56946,8.64814,8.64814,0,0,1-7.53825,5.50453H75.409A6.53148,6.53148,0,0,1,69.31376,22.216a5.18439,5.18439,0,0,1,1.116-1.75225l1.81469-1.87119,3.09716,3.1938-1.78991,1.85681a.7365.7365,0,0,0-.13776.22845,1.71732,1.71732,0,0,0,.05253,1.22548,1.95508,1.95508,0,0,0,1.9574,1.32559l.0892.00049a4.12753,4.12753,0,0,0,3.53721-2.56593,4.93187,4.93187,0,0,0-.27751-3.92126,5.70742,5.70742,0,0,0-5.13881-3.2047,7.18383,7.18383,0,0,0-6.65716,5.27906,26.84717,26.84717,0,0,0-.35251,4.3685Z"
            />
            <polygon
              id="voluta2-8"
              className="cls-1"
              points="66.582 26.379 66.582 30.756 62.097 30.756 62.229 26.379 66.582 26.379"
            />
            <rect
              id="voluta2-7"
              className="cls-1"
              x="62.09694"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-6"
              className="cls-1"
              x="62.09694"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-5"
              className="cls-1"
              x="62.09694"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-4"
              className="cls-1"
              x="62.09694"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-3"
              className="cls-1"
              x="62.09694"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-2"
              className="cls-1"
              x="62.09694"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta2-1"
              className="cls-1"
              x="62.09694"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="voluta2-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M66.58207,61.39321V65.77H62.09694v-4.3768Z"
            />
          </g>

          <g id="voluta1">
            <path
              id="voluta1-9-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M21.63145,26.37883a30.77037,30.77037,0,0,0-.5558-5.78924,11.59478,11.59478,0,0,0-10.85047-8.37175,10.1952,10.1952,0,0,0-2.67.35729,10.26858,10.26858,0,0,0-6.37372,5.287A9.50738,9.50738,0,0,0,.6879,25.43157,8.64814,8.64814,0,0,0,8.22615,30.9361h.2329A6.53149,6.53149,0,0,0,14.55427,22.216a5.18455,5.18455,0,0,0-1.116-1.75225l-1.81469-1.87119-3.09716,3.1938,1.78991,1.85681a.7365.7365,0,0,1,.13776.22845,1.71732,1.71732,0,0,1-.05253,1.22548,1.95508,1.95508,0,0,1-1.9574,1.32559l-.0892.00049a4.12753,4.12753,0,0,1-3.53721-2.56593A4.93187,4.93187,0,0,1,5.09529,19.936a5.70742,5.70742,0,0,1,5.13881-3.2047,7.18384,7.18384,0,0,1,6.65716,5.27906,26.84717,26.84717,0,0,1,.35251,4.3685Z"
            />
            <polygon
              id="voluta1-8"
              className="cls-1"
              points="17.286 26.379 17.286 30.756 21.771 30.756 21.64 26.379 17.286 26.379"
            />
            <rect
              id="voluta1-7"
              className="cls-1"
              x="17.28596"
              y="30.75563"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-6"
              className="cls-1"
              x="17.28596"
              y="35.13243"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-5"
              className="cls-1"
              x="17.28596"
              y="39.50923"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-4"
              className="cls-1"
              x="17.28596"
              y="43.88602"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-3"
              className="cls-1"
              x="17.28596"
              y="48.26282"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-2"
              className="cls-1"
              x="17.28596"
              y="52.63962"
              width="4.48513"
              height="4.3768"
            />
            <rect
              id="voluta1-1"
              className="cls-1"
              x="17.28596"
              y="57.01642"
              width="4.48513"
              height="4.3768"
            />
            <path
              id="voluta1-0.5-nobianco"
              data-name="nobianco"
              className="cls-1"
              d="M17.286,61.39321V65.77h4.48513v-4.3768Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
