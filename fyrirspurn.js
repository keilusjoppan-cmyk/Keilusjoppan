(() => {
  const storageKey = 'keilusjoppan-fyrirspurn';
  const email = 'keilusjoppan@gmail.com';
  const page = decodeURIComponent(location.pathname.split('/').pop()).normalize('NFC');
  let selection = [];

  function loadSelection() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(saved) ? saved.filter(item =>
        item && typeof item.id === 'string' && typeof item.name === 'string' &&
        Number.isInteger(item.quantity) && item.quantity > 0
      ) : [];
    } catch {
      return selection;
    }
  }

  function saveSelection() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(selection));
    } catch {
      // Keep the current list usable when browser storage is unavailable.
    }
    updateCount();
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function button(text, action, className = 'inquiry-button') {
    const node = element('button', text, className);
    node.type = 'button';
    node.addEventListener('click', action);
    return node;
  }

  const bar = element('div', '', 'inquiry-bar');
  const status = element('span', '', 'inquiry-status');
  status.setAttribute('role', 'status');
  const open = button('Fyrirspurnin mín (0)', () => {
    selection = loadSelection();
    renderList();
    dialog.showModal();
  });
  bar.append(status, open);
  document.querySelector('header').after(bar);

  const dialog = element('dialog', '', 'inquiry-dialog');
  const title = element('h2', 'Fyrirspurnin mín');
  title.id = 'inquiry-title';
  dialog.setAttribute('aria-labelledby', title.id);
  const close = button('Loka', () => dialog.close(), 'inquiry-secondary');
  const heading = element('div', '', 'inquiry-heading');
  heading.append(title, close);
  const list = element('ul', '', 'inquiry-list');
  const empty = element('p', 'Fyrirspurnin er tóm. Veldu vörur til að bæta við.');
  const instructions = element('p',
    'Hnappurinn opnar tölvupóst með vörulistanum. Við staðfestum pöntunina með þér og þú greiðir við afhendingu.');
  const message = element('a', 'Senda pöntunarfyrirspurn', 'inquiry-button');
  dialog.append(heading, empty, list, instructions, message);
  document.body.append(dialog);

  function updateCount() {
    const count = selection.reduce((total, item) => total + item.quantity, 0);
    open.textContent = 'Fyrirspurnin mín (' + count + ')';
  }

  function updateEmail() {
    const lines = selection.map(item =>
      '- ' + item.quantity + ' × ' + item.name + (item.size ? ' (stærð ' + item.size + ')' : '')
    );
    const body = [
      'Góðan dag,', '', 'Mig langar að spyrjast fyrir um eftirfarandi vörur:', '',
      ...lines, '',
      ...(selection.some(item => item.category === 'balls')
        ? ['Fyrir keilukúlur má bæta hér við óskum um þyngd, borun eða ráðgjöf.', ''] : []),
      'Kveðja'
    ].join('\r\n');
    message.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Pöntunarfyrirspurn') +
      '&body=' + encodeURIComponent(body);
  }

  function renderList() {
    updateCount();
    list.replaceChildren();
    empty.hidden = selection.length > 0;
    list.hidden = instructions.hidden = message.hidden = selection.length === 0;
    selection.forEach(item => {
      const row = element('li', '', 'inquiry-item');
      const controls = element('div', '', 'inquiry-controls');
      const quantityLabel = element('label', 'Magn');
      const quantity = element('input');
      quantity.type = 'number';
      quantity.min = '1';
      quantity.step = '1';
      quantity.value = item.quantity;
      quantity.setAttribute('aria-label', 'Magn fyrir ' + item.name);
      quantity.addEventListener('change', () => {
        item.quantity = Number.isInteger(quantity.valueAsNumber) && quantity.valueAsNumber > 0
          ? quantity.valueAsNumber : item.quantity;
        quantity.value = item.quantity;
        saveSelection();
        updateEmail();
      });
      quantityLabel.append(quantity);
      controls.append(quantityLabel);

      if (item.category === 'shoes') {
        const sizeLabel = element('label', 'Skóstærð');
        const size = element('input');
        size.type = 'text';
        size.maxLength = 16;
        size.placeholder = 't.d. 39';
        size.value = item.size || '';
        size.setAttribute('aria-label', 'Skóstærð fyrir ' + item.name);
        size.addEventListener('input', () => {
          item.size = size.value.trim();
          saveSelection();
          updateEmail();
        });
        sizeLabel.append(size);
        controls.append(sizeLabel);
      }

      const remove = button('Fjarlægja', () => {
        selection = selection.filter(other => other.id !== item.id);
        saveSelection();
        renderList();
        close.focus();
      }, 'inquiry-secondary');
      remove.setAttribute('aria-label', 'Fjarlægja ' + item.name);
      controls.append(remove);
      row.append(element('strong', item.name), controls);
      list.append(row);
    });
    updateEmail();
  }

  const category = page === 'keiluskór.html' ? 'shoes' : page === 'keilukulur.html' ? 'balls' : '';
  document.querySelectorAll('main .product-card').forEach(card => {
    const info = card.querySelector('.product-info, .product-body');
    const title = info?.querySelector('h3');
    if (!title) return;

    const label = title.textContent.trim();
    const brand = info.querySelector('.product-brand')?.textContent.trim();
    const name = brand ? brand + ' ' + label : label;
    const id = card.querySelector('.product-image img')?.getAttribute('src') || name;
    const featuredCategory = info.querySelector('.product-meta span')?.textContent.trim();
    const itemCategory = category || ({ 'Skór': 'shoes', 'Kúlur': 'balls' })[featuredCategory] || '';
        let confirmationTimer;
    const add = button('Bæta við fyrirspurn', () => {
      selection = loadSelection();
      const item = selection.find(entry => entry.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        selection.push({ id, name, category: itemCategory, quantity: 1 });
      }
      saveSelection();
            add.textContent = '✓ Bætt við fyrirspurn';
      add.setAttribute('aria-label', 'Bætt við fyrirspurn: ' + name);

      clearTimeout(confirmationTimer);
      confirmationTimer = setTimeout(() => {
        add.textContent = 'Bæta við fyrirspurn';
        add.setAttribute('aria-label', 'Bæta við fyrirspurn: ' + name);
      }, 2000);
      status.textContent = name + ' bætt við (' + (item?.quantity || 1) + ').';
    });
    add.setAttribute('aria-label', 'Bæta við fyrirspurn: ' + name);
        const oldLink = info.querySelector('.product-button, .product-link');

    if (oldLink && ['keiluskór.html', 'keilutoskur.html', 'fylgihlutir.html'].includes(page)) {
      oldLink.replaceWith(add);
    } else {
      info.append(add);
    }
  });

  function refreshSelection() {
    selection = loadSelection();
    updateCount();
    if (dialog.open) renderList();
  }

  window.addEventListener('pageshow', refreshSelection);
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) refreshSelection();
  });
  refreshSelection();
})();
