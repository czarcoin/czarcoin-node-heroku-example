$(document).ready(function() {
  // All jQuery/JavaScript code will go in here
  console.log('jquery ready')

  // Generate keypair
  $('.keypair-btn--generate').on('click', function(event) {
    event.preventDefault();
    console.log('Generate Key Pair button clicked');
    $.ajax({
      method: 'GET',
      url: '/keypair/generate'
    }).done(function(data) {
      console.log('Generated key pair ', data);
      $('.keypair-generated').text('Key Pair generated!');
    })
  });

  // Retrieve keypair
  $('.keypair-btn--retrieve').on('click', function(event) {
    event.preventDefault();
    console.log('Retrieve Key Pair button clicked');
    $.ajax({
      method: 'GET',
      url: '/keypair/retrieve'
    }).done(function(data) {
      console.log('Key pair(s) retrieved', data);
      if (data.length <= 0) {
        $('.keypair-retrieved').html('No keys retrieved')
      } else {
        data.forEach(function(datum) {
          const keyItem = document.createElement('li');
          $(keyItem).text(datum.key);
          $('.keypair-public').append(keyItem);
        });
      }
    });
  });

  // Get client info
  $('.credentials-btn--show').on('click', function(event) {
    event.preventDefault();
    console.log('Show Credentials button clicked');
    $.ajax({
      method: 'GET',
      url: '/user/retrieve'
    }).done(function(data) {
      $('.credentials--username').append(data.email);
      $('.credentials--password').append(data.password);
    })
  })

  // Authenticate client
  $('.auth-btn').on('click', function(event) {
    event.preventDefault();
    console.log('Authenticate button clicked');
    $.ajax({
      method: 'GET',
      url: '/user/authenticate/user-pass'
    }).done(function(data) {
      if (data === 'successful') {
        $('.auth-result').html('Authentication successful!')
      }
    })
  })

  // List buckets
  $('.bucket-btn--retrieve').on('click', function(event) {
    event.preventDefault();
    console.log('List Buckets button clicked');
    $.ajax({
      method: 'GET',
      url: '/buckets/retrieve'
    }).done(function(data) {
      if (data.length <= 0) {
        $('.buckets-retrieved').html('No buckets');
      } else {
        data.forEach(function(datum) {
          console.log(datum)
          const bucketItem = document.createElement('li');
          $(bucketItem).text(datum.name);
          $('.buckets-retrieved--list').append(bucketItem);
        })
      }
    })
  })
});
