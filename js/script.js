$(document).ready(function() {
    var bgCanvas = document.getElementById('bgCanvas');
    var width = $(window).width();
    var height = $(window).height();
    var hash = location.hash.split('#')[1];
    var is_personal_training = false;
    var checker_altert = 'Wähle bitte aus dem Dropdown aus, ob du Profi oder Anfänger bist!'
    var checker_altert2 = 'Wähle bitte aus dem Dropdown aus, wie lange du mit mir trainieren willst!'
    var button = '<button class="pay_by_invoice" style="float:right">Auf Rechnung Bestellen</button>';


    $.extend( $.validator.messages, {
        required: "Dieses Feld ist ein Pflichtfeld.",
        maxlength: $.validator.format( "Geben Sie bitte maximal {0} Zeichen ein." ),
        minlength: $.validator.format( "Geben Sie bitte mindestens {0} Zeichen ein." ),
        rangelength: $.validator.format( "Geben Sie bitte mindestens {0} und maximal {1} Zeichen ein." ),
        email: "Geben Sie bitte eine gültige E-Mail Adresse ein.",
        url: "Geben Sie bitte eine gültige URL ein.",
        date: "Bitte geben Sie ein gültiges Datum ein.",
        number: "Geben Sie bitte eine Nummer ein.",
        digits: "Geben Sie bitte nur Ziffern ein.",
        equalTo: "Bitte denselben Wert wiederholen.",
        range: $.validator.format( "Geben Sie bitte einen Wert zwischen {0} und {1} ein." ),
        max: $.validator.format( "Geben Sie bitte einen Wert kleiner oder gleich {0} ein." ),
        min: $.validator.format( "Geben Sie bitte einen Wert größer oder gleich {0} ein." ),
        creditcard: "Geben Sie bitte eine gültige Kreditkarten-Nummer ein."
    } );

    $(".youtube_video").fitVids();

    function checkSizes(){
        $('.about .bg').height($('.about .text').outerHeight())
        $('.info img').height(height - height / 3)
        $('.info').width($('.info img').width());
    }

    $(window).smartresize(function() {
        width = $(window).width();
        height = $(window).height();
        checkSizes();
    });


    $(document).on('click', 'footer button', function(event) {
        event.preventDefault();
        $('.data_text').toggleClass('active');
        $('html,body').animate({scrollTop: $('.impress_text').offset().top - 116}, 750,"easeInOutExpo")
    });

    $(document).on('click', '.start button', function(event) {
        $('html,body').animate({scrollTop: $('._pakete').offset().top - 116}, 750,"easeInOutExpo")
    });

    $(document).on('click', '.open_menu', function(event) {
        event.preventDefault();
        $('header').addClass('active');
    });

    $(document).on('change', '.table #choose', function(event) {
        event.preventDefault();
        is_paket = $("#choose").val() == "1" || $("#choose").val() == "2" ? true : false
        if(is_paket){
            var val_ = $("#choose").val() == "1" ?  "Paket 2 - Trainingsplan Anfänger" : "Paket 2 - Trainingsplan Profi";
            $('#chooser input[name="item_name"]').val(val_)
            $('.s_m,.w_i').removeClass('profi_checker')
        }else{
            $('.s_m,.w_i').addClass('profi_checker')
        }
    });


    $(document).on('change', '.table #choose2', function(event) {
        event.preventDefault();
        is_paket = $("#choose2").val() == "1" || $("#choose2").val() == "2" || $("#choose2").val() == "3" ? true : false
        if(is_paket){
            var val_ = "Paket 1 - Personal Training - ";
            var price = 0;
            if($("#choose2").val() == "1"){
                price = 49.00;
                val_ += "30 min"
            }else if($("#choose2").val() == "2"){
                price = 99.00;
                val_ += "60 min"
            }else if($("#choose2").val() == "3"){
                price = 149.00;
                val_ += "90 min"
            }


            $('#chooser2 input[name="item_name"]').val(val_)
            $('#chooser2 input[name="amount"]').val(price)
            $('.s_m2').removeClass('profi_checker')
        }else{
            $('.s_m2').addClass('profi_checker')
        }
    });



    $(document).on('click', '.profi_checker.s_m', function(event) {
        event.preventDefault();
        alert(checker_altert)
    });

    $(document).on('click', '.profi_checker.s_m2', function(event) {
        event.preventDefault();
        alert(checker_altert2)
    });

    $(document).on('click', '.close_menu', function(event) {
        event.preventDefault();
        $('header').removeClass('active');
    });

    var scrollpos = 0;

    $(document).on('click', '#more_info', function(event) {
        event.preventDefault();

        if($(this).hasClass('profi_checker')){
            alert(checker_altert)
        }else{
            scrollpos = $(this).closest('.table').offset().top - 100;

            $('.more_info').addClass('active');
            $('.more_info span').removeClass('active');

            var index = parseInt($(this).closest('.table_wrapper').index());

            if(($(this).prev('form').attr('id') == "chooser" && $("#choose").val() == "2") || index >= 2) index++;

            $('.more_info').find('span').eq(index).addClass('active');

            setTimeout(function() {
                $('html,body').animate({scrollTop: $('.more_info').offset().top - 200}, 750,"easeInOutExpo")
            }, 300);
        }

    });

    $(document).on('click', '.more_info button', function(event) {
        event.preventDefault();
        $('.more_info').removeClass('active');
        $('.more_info span').removeClass('active');

        setTimeout(function() {
            var pos = $(window).width() < 768 ? scrollpos : $('._pakete').offset().top - 135;

            $('html,body').animate({scrollTop: pos}, 750,"easeInOutExpo")
        }, 300);
    });



    $(document).on('click', 'nav a[data-section]', function(event) {
        event.preventDefault();
        $('header').removeClass('active')

        $('html,body').animate({scrollTop: $('.' + $(this).data('section')).offset().top - 116}, 750,"easeInOutExpo")
    });


    // INIT PAYPAL
    paypal.minicart.render({
        strings: {
            buttonAlt: "Gesamt:",
            discount: "Reduzierung:",
            subtotal : "Gesamt:",
            empty: "Ihr Warenkorb ist im Moment leer!"
        }
    });

    setTimeout(function() {
        $('.table input[type="button"]').attr("type","submit")
    }, 3000);



    $(document).on('click', '.checkout', function(event) {
        event.preventDefault();
        $('body').addClass('minicart-showing')
        if($('.pay_by_invoice').length == 0){
            $('.minicart-submit').after(button);
        }

        $('header').removeClass('active')

    });

    $(document).on('click', '.minicart-closer', function(event) {
        event.preventDefault();
        $('body').removeClass('minicart-showing')
    });

    $(document).on('click','.pay_by_invoice',function (event) {
        event.preventDefault();
        location.hash = "buy"
    });

    $(document).on('click', '.minicart-remove', function(event) {
        event.preventDefault();
        paypal.minicart.cart.remove(parseInt($(this).data('minicart-idx')))
        setTimeout(function() {
            $('.minicart-submit').after(button);
        }, 300);

    });

    paypal.minicart.cart.on("add",function(idx, product, isExisting){
        if (isExisting) {
                product.set('quantity', 1);
                alert('Du kannst ein Paket leider nur einmal pro Bestellung buchen!');
        }

        $('.minicart-submit').after(button);



        $('.checkout').attr('data-items',paypal.minicart.cart.items().length);
    });

    paypal.minicart.cart.on("remove",function(){
        $('.checkout').attr('data-items',paypal.minicart.cart.items().length);
    });

    $('.checkout').attr('data-items',paypal.minicart.cart.items().length);

    $('.datepicker').pickadate({
        min : true
    });

    $(".thanks.container form").validate({
      submitHandler: function(form) {
        $.ajax({
            url: '/send.php',
            type: 'POST',
            data: $(form).serialize()
        })
        .done(function(data,status) {
            alert(data)
            $('body').removeClass('thanks thanks_calendar')
            $('.thanks.container form').trigger("reset");
            location.hash = ""
            hash = ""
        })
        .fail(function(data,status) {
            alert(data)
        })
      }
    });

    $(".buy.container form").validate({
      submitHandler: function(form) {
        $.ajax({
            url: '/send_invoice.php',
            type: 'POST',
            data: $(form).serialize()
        })
        .done(function(data,status) {
            paypal.minicart.reset()
            hash = is_personal_training ? "#thanks_calendar" : "#thanks"
            location.hash = hash
            location.reload();
        })
        .fail(function(data,status) {
            alert(data)
        })
      }
    });

    function initBuy(){
        $('body').addClass('scroll_hidden')
        $('.buy.container').addClass('active')
        var for_form = "";
        var for_p = ""

        $('a.minicart-name').each(function(index, el) {

            if($(this).text().indexOf('Paket 1') > -1){
                is_personal_training = true;
            }

            for_form += $(this).text() + '\n';
            for_p += $(this).text() + '<br>';
        }).promise().done(function(){
            $('.payment_price').text($('.minicart-subtotal').text())

            $('.insert_pakete').val(for_form);
            $('.payment__ strong').html(for_p);
        });
    }

    function resetPage(){
        $('body').removeClass('thanks thanks_calendar scroll_hidden')
        $('.buy.container').removeClass('active')
    }

    $(document).on('click', '.thanks.container button,.buy.container button', function(event) {
        event.preventDefault();
        location.hash = ""
    });

    $(window).on('hashchange', function() {
        hash = location.hash.split('#')[1]
        if(hash == undefined){
            hash = "";
        }

        if(hash == "thanks" || hash == "thanks_calendar"){
            paypal.minicart.reset()
            $('body').addClass(hash + ' scroll_hidden')
        }else if(hash == "buy"){
            initBuy();
        }else{
            resetPage();
        }
    });

    checkSizes();
    $(window).trigger('hashchange');

});