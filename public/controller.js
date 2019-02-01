$(async () => {
    // set a random id when trying to fill
    $('#mine').click(() => {
        if(!$('#mineId').val()) {
            $.get('/v1/util/getUniqueId', (data, status) => {
                if(status = "success") {
                    $('#mineId').val(data.id);
                }
            });
        }
    });

    $('#pc').click(() => {
        if(!$('#pcId').val()) {
            $.get('/v1/util/getUniqueId', (data, status) => {
                if(status = "success") {
                    $('#pcId').val(data.id);
                }
            });
        }
    });

    $('#jeweler').click(() => {
        if(!$('#jewelerId').val()) {
            $.get('/v1/util/getUniqueId', (data, status) => {
                if(status = "success") {
                    $('#jewelerId').val(data.id);
                }
            });
        }
    });

    $('#certifier').click(() => {
        if(!$('#certifierId').val()) {
            $.get('/v1/util/getUniqueId', (data, status) => {
                if(status = "success") {
                    $('#certifierId').val(data.id);
                }
            });
        }
    });

    $('#mineCreator').click(() => {
        console.log("mine being added")
        const id = $('#mineId').val();
        const mineLocation = `${$('#mineLocationLat').val()}Lat${$('#mineLocationLong').val()}Long`;
        const admin = $('#mineAdmin').val();
        if(id && mineLocation && admin) {
            $.post('/v1/controller/create/mine', {
                id,
                location: mineLocation,
                admin
            }, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#mineMsg').html(`Mine with id ${id} successfully created`);
                } else {
                    $('#mineMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });

    $('#pcCreator').click(() => {
        console.log("Processing center being added")
        const id = $('#pcId').val();
        const admin = $('#pcAdmin').val();
        if(id && admin) {
            $.post('/v1/controller/create/pc', {
                id,
                admin
            }, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#pcMsg').html(`Processing center with id ${id} successfully created`);
                } else {
                    $('#pcMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });

    $('#jewelerCreator').click(() => {
        console.log("Jeweler being added")
        const id = $('#jewelerId').val();
        const admin = $('#jewelerAdmin').val();
        if(id && admin) {
            $.post('/v1/controller/create/jeweler', {
                id,
                admin
            }, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#jewelerMsg').html(`Jeweler with id ${id} successfully created`);
                } else {
                    $('#jewelerMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });

    $('#certifierCreator').click(() => {
        console.log("Certifier being added")
        const id = $('#certifierId').val();
        const admin = $('#certifierAdmin').val();
        if(id && admin) {
            $.post('/v1/controller/create/certifier', {
                id,
                admin
            }, (data, status) => {
                console.log(data, status);
                if(status == 'success') {
                    $('#certifierMsg').html(`Certifier with id ${id} successfully created`);
                } else {
                    $('#certifierMsg').html(`There was an issue creating mine. Check back later.`);
                }
            })
        }
    });

});