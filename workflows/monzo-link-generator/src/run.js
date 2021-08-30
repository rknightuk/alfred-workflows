function run(argv) {
  ObjC.import('stdlib');
  var input = argv[0].split(' ');
  var price = input[0];
  var description = input[1] ? input[1] : null;

  var username = $.getenv('MONZOUSERNAME');

  var url = 'https://monzo.me/' + username + '/' + price;

  if (description) {
    url += '?d=' + description;
  }

  return url;
}