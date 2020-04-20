//Testeá la función reservarHorario(horario)

var expect = chai.expect;

describe('Test de reserva de horarios', function(){
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9])
    })

    it('debe eliminar el horario reservado del arreglo horarios', function(){
        
        restaurant.reservarHorario("11:30");
            expect(restaurant.horarios).to.eql(["12:00", "22:30"])
    })

    it('cuando se reverva un horario que no existe el arreglo debe quedar igual', function(){
        restaurant.reservarHorario("9:00");
        expect(restaurant.horarios).to.eql(["11:30", "12:00", "22:30"])
    })

    it('cuando NO se pasa ningun parametro, el arreglo se mantiene igual', function(){
        restaurant.reservarHorario("");
        expect(restaurant.horarios).to.eql(["11:30", "12:00", "22:30"])
    })
})

//Paso 3: Testeá la función obtenerPuntuación()
describe('Test de obtener puntuacion del restaurante', function(){
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9])
    
    })

    it('dadas las calificaciones del restaurante, el promedio se calcula correctamente', function(){
        restaurant.obtenerPuntuacion();
        expect(restaurant.obtenerPuntuacion()).to.equal(6.7)
    })

    it('dado un restaurante que no tenga calificacion la puntuacion es = a 0', function(){
        restaurant.calificaciones = [];
        expect(restaurant.obtenerPuntuacion()).to.equal(0)
    })

})


//Paso 4: Testeá la función calificar()
describe('Test de calificacion de restaurante', function(){
    var restaurant;
    beforeEach(function () {
        restaurant = new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5])
    })

    it('cuando se pasa un numero entre 1 y 10 por parametro la calificacion se actualiza', function(){
        restaurant.calificar(5);
        expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5, 5])
    })

    it('cuando se pasa por parametro un valor = 0 aparece un cartel de error, la calificacion sigue siendo la misma', function(){
        restaurant.calificar(0);
        expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5])
    })

    it('cuando se pasa por parametro un valos negativo aparece un cartel de error, la calificacion sigue siendo la misma',function(){
        restaurant.calificar(-4);
        expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5])
    })

    it('cuando se pasa por parametro un valor > a 10 aparece un cartel de error, la calificacion sigue siendo la misma', function(){
        restaurant.calificar(15);
        expect(restaurant.calificaciones).to.eql([6, 7, 9, 10, 5])
    })

})


//Testear la funcion buscarRestaurante(id)

describe('Test de busqueda de un restaurante', function(){
    
    var restaurant = [];
    var listado;
        beforeEach(function () {
        restaurant = new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6])
        listado = new Listado(restaurant);
    })

    it('dado el id=10 se encuentra exitosamente el restaurante "New London Cafe"', function(){
        listado.buscarRestaurante(10);
        expect(restaurant.id).to.equal(10);
    })
    
    it('al ingresar un valor negativo NO me devuelve el restaurante', function(){
        var resto = listado.buscarRestaurante(-2);
        expect(resto.id).to.not.equal(-2);
    })

    it('al ingresar un valor diferente a 10 NO me devuelve el restaurante', function(){
        var resto = listado.buscarRestaurante(11);
        expect(resto.id).to.not.eql(11);
    })

    it('al ingresar un parametro vacio NO me devuelve el restaurante', function(){
        var resto = listado.buscarRestaurante();
        expect(resto.id).to.not.eql(false);
    })
    
})

//Testeá la función obtenerRestaurantes()
describe('Testeá la función obtener Restaurantes', function(){
    //var restaurant;
    //var restaurant;
    var listado;
    
        beforeEach(function () {
        //restaurant = new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9])
        listado = new Listado([new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9])]);
         
    })

    it('dados los parametros filtroRubro, filtroCiudad, filtroHorario se ejecuta la busqueda correcta del restaurante', function(){
        var restauranteEncontrado = listado.obtenerRestaurantes("Pasta", "Nueva York", "14:30");
        expect(restauranteEncontrado.rubro).to.equal(listado[2]);
        expect(restauranteEncontrado.ubicacion).to.equal(listado[3]);
        expect(restauranteEncontrado.horarios).to.equal(listado[4]);
    })

    it('dados los parametros vacios, NO devuelve el restaurante', function(){
        var restauranteEncontrado = listado.obtenerRestaurantes();
        expect(restauranteEncontrado).to.not.equal(listado)

    })

    it('dados al menos un parametro que no coincida , NO devuelve el restaurante', function(){
        var restauranteEncontrado = listado.obtenerRestaurantes("Asia", "New York", "14:30");
        expect(restauranteEncontrado).to.not.equal(listado)

    })
})

//Convertí los requerimientos en pruebas unitaria
//Que un restaurante calcule correctamente su precio base
    var reserva1 = new Reservas (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")

    var reserva2 = new Reservas (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200")


describe('Que un restaurante calcule correctamente su precio base', function(){

    it('Dada la reserva1 calcula bien el precio base', function(){
        reserva1.calcularPrecioBase();
        expect(reserva1.PrecioBaseDeReserva).to.equal(2800);
    })
    
    it('Dada la reserva2 calcula bien su precio base', function(){
        reserva2.calcularPrecioBase();
        expect(reserva2.PrecioBaseDeReserva).to.equal(300);
    })
    
})

describe('Que un restaurante calcule correctamente el descuerto por persona', function(){
    it('Dada la reserva 1 se calcula bien el descuento por persona', function(){
        reserva1.calcularDescuentosPorPersona();
        expect(reserva1.descuertosPorPersona).to.equal(420);
    })

    it('Dada la reserva 2 se calcula bien el descuento por persona', function(){
        reserva2.calcularDescuentosPorPersona();
        expect(reserva2.descuertosPorPersona).to.equal(0);
    })

})

describe('Que un restaurante calcule correctamente el descuerto por codigo', function(){
    it('Dada la reserva 1 se calcula bien el descuento por codigo', function(){
        reserva1.calcularDescuentoPorCodigo();
        expect(reserva1.descuentoPorCodigo).to.equal(350);
    })

    it('Dada la reserva 2 se calcula bien el descuento por codigo', function(){
        reserva2.calcularDescuentoPorCodigo();
        expect(reserva2.descuentoPorCodigo).to.equal(200);
    })

})

describe('Que un restaurante calcule correctamente el descuerto adicionla', function(){
    it('Dada la reserva 1 se calcula bien el descuento adicionla', function(){
        reserva1.calcularAdicionales();
        expect(reserva1.descuentoAdicional).to.equal(280);
    })

    it('Dada la reserva 2 se calcula bien el descuento adicionla', function(){
        reserva2.calcularAdicionales();
        expect(reserva2.descuentoAdicional).to.equal(0);
    })

})

describe('Que un restaurante calcule correctamente el precio final de la reserva', function(){

    it('Dada la reserva 1 se calcula bien el precio final de reserva', function(){
        reserva1.calcularPrecioFinal();
        expect(reserva1.precioFinalDeReserva).to.equal(2310);
    })

    it('Dada la reserva 2 se calcula bien el precio final de reserva', function(){
        reserva2.calcularPrecioFinal();
        expect(reserva2.precioFinalDeReserva).to.equal(100);
    })

})