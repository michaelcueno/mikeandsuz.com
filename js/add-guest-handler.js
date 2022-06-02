let guest_count = 1;
let human_count = ['noop', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth?', '.. thats a lot - give us a call?', 'stop it', 'please stop'];
(function () {
  const addGuestButton = document.getElementById('add-guest-button');
  addGuestButton.addEventListener('click', (event) => {
    if (guest_count > 7) return;
    console.log('wyf');
    event.preventDefault();
    const inputs = document.getElementById('form-inputs');
    const newGuest = document.createElement('div')
    newGuest.classList = "row center padding-bottom";
    newGuest.append(document.createElement('i'));
    const input = document.createElement('input');
    input.name = `guest_${guest_count}`;
    input.type = 'text';
    input.placeholder = `${human_count[guest_count]} ${guest_count < 5 ? 'Guest Name': ''}`;
    newGuest.append(input);
    newGuest.innerHTML
    inputs.append(newGuest);
    guest_count++;
  })
})();