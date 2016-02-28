// Saves options to chrome.storage
function save_options() {
  var mgm_spndrkto = document.getElementById('nmform').spndr.value;
  chrome.storage.sync.set({
    mgm_spndr: mgm_spndrkto
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    mgm_spndr: ""
  }, function(items) {
    document.getElementById('nmform').spndr.value = items.mgm_spndr;

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
