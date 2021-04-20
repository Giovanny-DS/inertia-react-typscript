let text: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna scelerisque, gravida mi vel, ullamcorper justo. Fusce varius cursus hendrerit. Vestibulum sagittis ornare ligula eget vehicula. Nunc sodales nisi eget purus aliquet sollicitudin. Praesent vehicula, est at lacinia condimentum, dolor leo pulvinar est, at fringilla lorem lectus ac orci. Curabitur consectetur congue lacus a sodales. Aliquam pretium lacus quis libero commodo bibendum. Phasellus in suscipit ipsum, a interdum ligula. Nullam a iaculis augue. Aenean a mi nulla. Nunc ut consequat est. Ut accumsan dictum lacus id vestibulum. Morbi rutrum dignissim ligula, non accumsan nisi. Vestibulum tincidunt mattis diam et facilisis. Nam in lectus vulputate, ultrices nisi ac, blandit tortor. Praesent ante nulla, luctus eu leo id, eleifend egestas lectus. Donec ullamcorper finibus mi, eget porta lorem volutpat a. Cras eu dignissim tortor. Phasellus sed lobortis massa. Curabitur consectetur at arcu sed feugiat. Fusce tempus scelerisque risus, sed pharetra purus lacinia vel. Donec pharetra nibh non purus cursus finibus non quis nisi. Aenean aliquet eros lorem, sed ultricies nisl luctus a. Mauris bibendum orci non tristique tempor. Suspendisse aliquet vel arcu et molestie. Sed id tincidunt diam, quis lacinia nisl. Integer at lorem ac arcu ultricies tristique. Nunc at pretium nulla. Morbi vulputate felis id neque dapibus, non suscipit sem mattis. In ultricies elit quis purus tempus malesuada. Nunc efficitur interdum justo, eu rutrum quam dictum at. Quisque varius tincidunt sagittis. Praesent finibus vulputate neque sed placerat. Nunc sed bibendum ante. Sed vulputate felis ultricies enim pretium maximus. Ut in congue enim. Maecenas varius dui eu arcu aliquet, auctor sollicitudin odio lacinia. Sed finibus ipsum at augue convallis aliquam. Morbi suscipit diam quam, ut suscipit mi convallis in. Fusce et felis sit amet sapien fringilla dictum. Ut blandit placerat felis. Proin ut congue est. Fusce nulla felis, facilisis ac eros a, viverra facilisis neque. Duis eu dictum mauris. Sed suscipit, nisl maximus porttitor euismod, nisl magna molestie nulla, non ultricies nibh sapien sit amet elit. In nulla risus, lobortis eget mattis ut, condimentum ac arcu. Morbi vel sapien viverra, vehicula odio quis, ornare nunc. Praesent non elit eros. Mauris sit amet mauris lacus. Sed porttitor felis nec dapibus efficitur. Nam placerat interdum orci vel pharetra. Proin quis maximus libero. Ut rutrum commodo leo. Cras laoreet tincidunt libero, vitae cursus est rutrum ac. Fusce vulputate tellus ut nisl tincidunt placerat. Cras facilisis semper aliquet. In tincidunt, ipsum eu mattis tincidunt, est mauris mollis sem, eget varius tellus leo nec sem. Vestibulum finibus mauris luctus ligula dapibus eleifend ut eu tortor. Suspendisse suscipit libero iaculis quam scelerisque, vitae commodo nulla interdum. Cras maximus malesuada lacus, elementum venenatis neque lacinia et.';
function wordRepetitions(text: string) {
  let sliced = text.split(' ');
  let reduced = sliced.reduce((acc: any, val: string) => {
    let word = val.toLowerCase();
    if (word.endsWith(',') || word.endsWith('.')) {
      word = word.substring(0, word.length - 1);
    }
    if (Object.keys(acc).includes(word)) {
      return (acc = { ...acc, [word]: acc[word] + 1 });
    }
    return (acc = { ...acc, [word]: 1 });
  }, {});
  Object.entries(reduced).forEach((word: [string, any]) => {
    console.log(`la palabra "${word[0]}" se repite ${+word[1]} ${+word[1] > 1 ? 'veces' : 'vez'} `);
  });
}

wordRepetitions(text);
