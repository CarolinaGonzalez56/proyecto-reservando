var Reservas = function(horario, cantidadPersonas, precioPorPersona, codigoDescuento){
    this.horario = horario,
    this.cantidadPersonas = cantidadPersonas,
    this.precioPorPersona = precioPorPersona,
    this.codigoDescuento = codigoDescuento
}


Reservas.prototype.calcularPrecioBase = function(){

    this.PrecioBaseDeReserva = this.cantidadPersonas * this.precioPorPersona;
    
}


Reservas.prototype.calcularDescuentosPorPersona = function(){
    var base, descuentos;
    base = this.PrecioBaseDeReserva;
    descuentos = 0;
     
    //Descuentos por camtidad de personas
    if(this.cantidadPersonas >= 8){
        descuentos = base * 0.15;
    }
    else if( this.cantidadPersonas >=7){
        descuentos = base * 0.10;
    }
    else if( this.cantidadPersonas >=4){
        descuentos = base * 0.05;
    }
    else if( this.cantidadPersonas <=3){
        descuentos = 0;
    }
    
    this.descuertosPorPersona = descuentos;
}

Reservas.prototype.calcularDescuentoPorCodigo = function(){
      //Descuentos por codigo de reserva
      var base, descuentos;
      base = this.PrecioBaseDeReserva;
      descuentos = 0;

    switch(this.codigoDescuento){
        case 'DES15':
            descuentos = base * 0.15;
            break;
        case 'DES200':
            descuentos = 200;
            break;
        case 'DES1':
            descuentos = this.precioPorPersona;
            break;
    }
    this.descuentoPorCodigo = descuentos;
}

Reservas.prototype.calcularAdicionales = function(){
    var adicionales, base, dia, hora;

    adicionales = 0;
    base = this.PrecioBaseDeReserva;
    dia = this.horario.getDay();
    hora = this.horario.getHours();

    if(dia > 4){
        adicionales = base * 0.10;
    }
    switch(hora){
        case 13:
        case 14:
        case 20:
        case 21:
            adicionales = base * 0.5;
            break;
    }

    this.descuentoAdicional = adicionales;
}

Reservas.prototype.calcularPrecioFinal = function(){
    var base, descuentos, adicionales;
    base = this.PrecioBaseDeReserva;
    descuentos = this.descuertosPorPersona + this.descuentoPorCodigo;
    adicionales = this.descuentoAdicional;
     
    this.precioFinalDeReserva = base + adicionales - descuentos;;

}


