
class Calculadora {

    constructor() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.estadoErro = false;
        this.memTemp = '';
        this.memoria = 0;
        this.iniciouSegundo = false;
        this.op = {
            NOP: 0,
            SUM: 1,
            SUB: 2,
            MULT: 3,
            DIV: 4
        };
        this.opAtual = this.op.NOP;
    }

    mostraVisor() {
        return this.nrVisor;
    }

    recebeDigito(dig) {
        if (this.estadoErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
            this.iniciouSegundo = true;
            this.ptDecimal = false;
            this.nrVisor = '0';
        }
        if (this.nrVisor.length == 10) return;
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.nrVisor == '0') {
            this.nrVisor = dig == '.' ? '0.' : dig;
        } else {
            this.nrVisor += dig;
        }
    }

    defineOperacao(op) {
        if (this.estadoErro) return;
        switch (op) {
            case '+':
                this.opAtual = this.op.SUM;
                break;
            case '-':
                this.opAtual = this.op.SUB;
                break;
            case '/':
                this.opAtual = this.op.DIV;
                break;
            case '*':
                this.opAtual = this.op.MULT;
                break;
        }
        this.memTemp = this.nrVisor;
    }

    igual() {
        if (this.estadoErro) return;
        if (this.opAtual == this.op.NOP) return;
        let num1 = parseFloat(this.memTemp);
        let num2 = parseFloat(this.nrVisor);
        let resultado = 0;
        switch (this.opAtual) {
            case this.op.SUM:
                resultado = num1 + num2;
                break;
            case this.op.SUB:
                resultado = num1 - num2;
                break;
            case this.op.MULT:
                resultado = num1 * num2;
                break;
            case this.op.DIV:
                if (num2 == 0) {
                    this.estadoErro = true;
                    this.nrVisor = 'ERRO!';
                    return;
                }
                resultado = num1 / num2;
                break;
        }
        this.opAtual = this.op.NOP;
        this.ptDecimal = false;
        this.memTemp = '';
        this.iniciouSegundo = false;
        this.nrVisor = String(resultado).slice(0, 10);
    }

    teclaC() {
        this.nrVisor = '0';
        this.ptDecimal = false;
        this.iniciouSegundo = false;
        this.opAtual = this.op.NOP;
        this.memTemp = '';
        this.estadoErro = false;
    }

    teclaMmais() {
        if (this.estadoErro) return;
        this.memoria += parseFloat(this.nrVisor);
    }

    teclaMmenos() {
        if (this.estadoErro) return;
        this.memoria -= parseFloat(this.nrVisor);
    }

    teclaRM() {
        if (this.estadoErro) return;
        this.nrVisor = String(this.memoria);
    }

    teclaCLM() {
        if (this.estadoErro) return;
        this.memoria = 0;
    }

    raizQuadrada() {
        if (this.estadoErro) return;
        let numero = parseFloat(this.nrVisor);
        if (numero < 0) {
            this.estadoErro = true;
            this.nrVisor = 'ERRO!';
            return;
        }
        let raiz = Math.sqrt(numero);
        this.nrVisor = String(raiz).slice(0, 10);
    }

    inverso() {
        if (this.estadoErro) return;
        let numero = parseFloat(this.nrVisor);
        if (numero === 0) {
            this.estadoErro = true;
            this.nrVisor = 'ERRO!';
            return;
        }
        let inverso = 1 / numero;
        this.nrVisor = String(inverso).slice(0, 10);
    }

    calcularPorcentagem() {
        if (this.estadoErro) return;
        let numero = parseFloat(this.nrVisor);
        let porcentagem = numero / 100;
        this.nrVisor = String(porcentagem).slice(0, 10);
    }

    alternarSinal() {
        if (this.estadoErro) return;
        this.nrVisor = -parseFloat(this.nrVisor);
    }
}

let calculadora = new Calculadora();

let mostraVisor = () => {
    document.getElementById('visor-id').innerHTML = calculadora.mostraVisor();
}

let digito = (dig) => {
    calculadora.recebeDigito(dig);
    mostraVisor();
}

let defOp = (op) => {
    if (calculadora.opAtual != calculadora.op.NOP) {
        igual();
        mostraVisor();
    }
    calculadora.defineOperacao(op);
}

let igual = () => {
    calculadora.igual();
    mostraVisor();
}

let teclaC = () => {
    calculadora.teclaC();
    mostraVisor();
}

let teclaMmais = () => {
    calculadora.teclaMmais();
}

let teclaMmenos = () => {
    calculadora.teclaMmenos();
}

let teclaRM = () => {
    calculadora.teclaRM();
    mostraVisor();
}

let teclaCLM = () => {
    calculadora.teclaCLM();
}

let raizQuadrada = () => {
    calculadora.raizQuadrada();
    mostraVisor();
}

let inverso = () => {
    calculadora.inverso();
    mostraVisor();
}

let calcularPorcentagem = () => {
    calculadora.calcularPorcentagem();
    mostraVisor();
}

let alternarSinal = () => {
    calculadora.alternarSinal();
    mostraVisor();
}

mostraVisor();


