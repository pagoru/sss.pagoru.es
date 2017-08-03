/**
 * Created by Pablo on 04 Aug 17.
 */

new Clipboard('#password');
let last_hexadecimalSeed = "Bender";

const send = () => {
    let secret = $("#secret").val();
    let service = $("#service").val();

    secret = secret.length === 0 ? Math.random() : secret;
    service = service.length === 0 ? Math.random() : service;

    $.get(`/sss/${secret}/${service}`, function( data ) {
        if(data.hexadecimalSeed === undefined
            || data.password === undefined) return;
        const hexa = data.hexadecimalSeed.substring(0, 8);

        $("title").html(hexa);
        $("#hexadecimalSeed").html(hexa);

        $("#password").attr("data-clipboard-text", data.password);

        if(last_hexadecimalSeed !== data.hexadecimalSeed){
            let robohash = `https://robohash.org/${hexa}`;
            $("#favicon").attr("href", robohash);
            $("#robotRock").attr("src", robohash);
            last_hexadecimalSeed = data.hexadecimalSeed;
        }
    });
};
send();

$("#secret").on('keyup', send);
$("#service").on('keyup', send);