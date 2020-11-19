export default function FakeAutomata(args) {
  let statusTable = args.statusTable;
  let finalStatus = args.finalStatus;
  let transitions = args.transitions;
  let string = args.string;
console.log(string)
//definimos el siguiente estado
  let status = 1;   
  for (let char of string) {
   
    let inputStatus = 0;
    for (let i = 0; i < transitions.length; i++) {
        
      if (transitions[i].indexOf(char) !== -1) {
        //el caracter pertenece a una transicion
        
        inputStatus = i + 1;
        break;
      } else if (i === transitions.length - 1 && transitions[i] === "_others") {
        inputStatus = i + 1;
        break;
      }
    }
    //actuliza el estado 
    status = statusTable[status][inputStatus];
    
  }
  //validamos que el estado final sea el designado
  return finalStatus.indexOf(status) !== -1 ? true : false;
}
