// TODO: Write code to define and export the Employee class
class Employee {
    constructor (name, id, email) {
      this.name = name
      this.id = id
      this.email= email
    }
    getName(){
        return this.name
    }
    getID(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        console.log(this.constructor.name)
        return this.constructor.name
        // const role = new Employee()
        // console.log(role.constructor.name)

        // return role.constructor.name

    }
}

 //const newemployee = new Employee('Gayathiri','123','test@GMAIL.COM')
 //newemployee.getRole()
module.exports = Employee