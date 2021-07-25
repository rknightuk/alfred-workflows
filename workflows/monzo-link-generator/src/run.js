var username = $.getenv('MONZOUSERNAME');

function run(argv) {
  var input = argv[0].split(' ');
  var price = input[0];
  var description = input[1] ? input[1] : null;

  var url = 'https://monzo.me/' + username + '/' + price;

  if (description) {
    url += '?d=' + description;
  }

  return url;
}