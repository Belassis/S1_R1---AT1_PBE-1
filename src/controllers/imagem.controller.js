const imagemController = {
    upload:async (req,res) => {
        try {
           if (!req.file){
            return res.status(400).json({message: "Arquivo não enviado🤔"}); 
           } 
            return res.status(200).json({message: "Upload realizado com sucesso!"}); 

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Ocorru um erro no servidor',
                erroMessage: error.message });
        }
    }
}

export default imagemController;