const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {
        
        description: "Website",
        amount: -50040,
        date: "23/01/2021",
    },
    {
    
        description: "Luz",
        amount: 500002,
        date: "23/01/2021",
    },
    {
       
        description: "Internet",
        amount: -20023,
        date: "23/01/2021",
    },
    {
  
        description: "Primeiro salário",
        amount: 900042,
        date: "23/01/2021",
    }

]

const Transaction = {
    all: transactions,
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()

    },

    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },
    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income;
    },
    expanses(){
        let expanse = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0){
                expanse += transaction.amount;
            }
        })
        return expanse; 
    },
    total(){
        return Transaction.incomes() + Transaction.expanses() 
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? 'income': 'expanse'

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td class="minus"><img src="/images/minus.svg" alt="Remover transação"/></td>
                    `
        return html
    },
    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById("expanseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expanses())
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML =""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "+"

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
            style:"currency",
            currency: "BRL"
        })
        return(signal + value)
    }
}

const Form ={
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValue(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    validateData(){
        const {description, amount, date} = Form.getValues()
        if(description.trim() === "" ||
           amount.trim() === "" ||
           date.trim.trim() === ""){
               throw new Error("Por favor, complete todos os campos!")
           }
    },
    submit(event){

        event.preventDefault()
    }
}

const App = {
    init(){
        transactions.forEach(function(transaction) {
            DOM.addTransaction(transaction)
        })
        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransactions()
        App.init()

    },
}
    App.init()


