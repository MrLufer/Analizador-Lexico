import React, { useState } from "react";
import analyzeString from "./core/LexicalAnalyzer";
import { CodeFlaskReact } from "react-codeflask";
import { TOKENS } from "./core/tokens"
import "./css/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const searchToken = (token) => {

    let found = TOKENS.find(e => e.lexema == token)
    if (found) {
        return found
    }
    else {
        found = "error"
        return found
    }

}

const Main = () => {


    const [text, settext] = useState("/* Ingresa aquí tu código */")
    const [result, setresult] = useState([])
    const [simbols, setsimbols] = useState([])
    const handleTextChange = (code) => {
        settext(code)
    }

    const handleSubmit = () => {
        let string = text;
        let result = analyzeString(string);
        let simbolArray = []

        result.map(token=>{
            if(token.type==1){
               let found =  searchToken(token.content)
               token.type = found.descripcion
               token.key = found.token
            }
            if(token.type==3){
                let found =  searchToken(token.content)
               token.type = found.descripcion
               token.key = found.token
            }   
            if(token.type==4){
                let found =  searchToken(token.content)
                token.type = found.descripcion
                token.key = found.token
            }

            if(token.type==6){
                token.type = "COMENTARIO"
                token.key = 700
            }
            if(token.type == 5){
                token.type = "NUMERO"
                token.key = 600
            }
        })

        setresult(result)
        result.forEach(token => {
            if (token.type == 2) {
                token.key = 100
                token.type = "id"
                simbolArray.push(token)
            }
           
        })
        setsimbols(simbolArray)
    }

    const handleReset = () => {
        settext("/* Ingresa aquí tu código */")
    }

    console.log(result)
    return (
        <div className="row">
            <div className="left-box col-lg-6 col-md-6 col-sm-6 col-xs-1">

                <CodeFlaskReact
                    code={text}
                    onChange={handleTextChange}
                    id="code-editor"
                    language="clike"
                    fontSize={25}
                    defaultTheme={false}
                />

                <div className="buttons row">
                    <div className="col-lg-6 col-xs-1">
                        <button className="btn btn-warning" onClick={() => handleReset()}>
                            Reiniciar <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                    <div className="col-lg-6 col-xs-1">
                        <button className="btn btn-primary" onClick={() => handleSubmit()}>
                            Analizar <i className="fas fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-1">
                <h2 style={{ fontFamily: "Roboto" }}>TABLA QUE RECONOCE TODO</h2>
                <div className="token-table-container">
                    <TokenTable tokens={result} />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-1">
                <h2 style={{ fontFamily: "Roboto" }}>TABLA DE SIMBOLOS</h2>
                <div className="token-table-container">
                    <TokenTable tokens={simbols} />
                </div>
            </div>
        </div>
    );
}


function TokenTable(props) {
    let typeStringsCHN = [
        "error",
        "Palabras clave",
        "Identificador",
        "Operador",
        "Separador",
        "constante",
        "Comentario",]
    const tokens = props.tokens.map((token) => {
        return (
            <tr key={token.key}>
                <td>{token.key}</td>
                <td>{token.type}</td>
                <td>{token.content}</td>
            </tr>
        );
    });

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <td>TOKEN</td>
                    <td>DESCRIPCIÓN</td>
                    <td>LEXEMA</td>
                </tr>
            </thead>
            <tbody>{tokens}</tbody>
        </table>
    );
}


export default Main;
