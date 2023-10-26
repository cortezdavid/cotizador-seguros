class Seguro {
    constructor(anio, gnc, costoPorModelo, descuento) {
        this.anio = anio
        this.gnc = gnc
        this.costoPorModelo = costoPorModelo
        this.descuento = descuento
        this.precioBase = 25000
    }

    //función que retorna un precio extra segun el año
    calcularPorAnio() {
        if (this.anio >= 2016 && this.anio <= 2018) {
            return 5000
        } else if (this.anio == 2019 || this.anio == 2020) {
            return 7000
        } else if (this.anio >= 2021 && this.anio <= 2023) {
            return 9000
        } else {
            return 0
        }
    }

    //función que retorna el costo adicional según el modelo del auto
    sumarCostoAdicional() {
        if (this.costoPorModelo) {
            return this.costoPorModelo
        } else {
            return 0
        }
    }

    //retorna un aumento de 5% si el auto tiene gnc
    calcularGnc() {
        if (this.gnc) {
            return 1.05
        } else {
            return 1
        }
    }

    //calcula el precio del tercero básico
    //suma el premio base mas el precio del modelo del auto y precio del año, a todo eso le suma un % si es que tiene gnc
    //a todo eso le resta un descuento segun la marca
    calcularTercerosBasico() {
        let precio = (this.precioBase + this.sumarCostoAdicional() + this.calcularPorAnio()) * this.calcularGnc()
        let precioFinal = precio - (precio * this.descuento)
        return precioFinal
    }

    //calcula el lo mismo que el tercero básico pero le suma un 6000 al precio base
    calcularTercerosCompleto() {
        let precio = (this.precioBase + this.sumarCostoAdicional() + this.calcularPorAnio() + 6000) * this.calcularGnc()
        let precioFinal = precio - (precio * this.descuento)
        return precioFinal
    }

    //se suma un 12000 al precio
    calcularTodoRiesgo() {
        let precio = (this.precioBase + this.sumarCostoAdicional() + this.calcularPorAnio() + 12000) * this.calcularGnc()
        let precioFinal = precio - (precio * this.descuento)
        return precioFinal
    }
}
