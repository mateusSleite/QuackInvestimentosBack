const Investiment = require("../model/Investiment");

class InvestimentController {
    static async createInvestment(req, res) {
        const { userId, nameInvestment, description, value, startDate, endDate, category, classification, isInput } = req.body;
        const investment = new Investiment({
            userId,
            nameInvestment,
            description,
            value,
            startDate,
            endDate,
            category,
            classification,
            isInput,
            extract: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        });
        try {
            await Investiment.create(investment);
            res.status(201).send({ message: "Investimento cadastrado" });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao cadastrar investimento", data: error.message });
        }
    }


    // static async getAll(req, res) {
    //     try {
    //         const investiments = await Investiment.find();
    //         res.status(200).json(investiments);
    //     }
    //     catch (error) {
    //         return res.status(500).send({ message: "Erro ao mostrar investimentos", data: error.message });
    //     }
    // }

  static async getAll(req, res) {
    const { user } = req.query;
    // Validação básica do ID
    if (!user || typeof user !== 'string' || user.trim() === '') {
        console.error("ID de usuário inválido");
        return res.status(400).json({ message: "ID de usuário inválido" });
    }

    console.log("Buscando investimentos para o usuário:", user);

    try {
        const investments = await Investment.find({ userId: user });
        
        console.log("Investimentos encontrados:", investments);

        // Verifica se há investimentos encontrados
        if (investments.length === 0) {
            console.warn("Nenhum investimento encontrado para este usuário");
            return res.status(404).json({ message: "Nenhum investimento encontrado para este usuário" });
        }

        res.status(200).json(investments);
    } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
        return res.status(500).json({ message: "Erro ao buscar investimentos", data: error.message });
    }
}





    static async getID(req, res) {
        const { id } = req.query;
        try {
            const investiment = await Investiment.findById(id)
            if (!investiment) return res.status(404).json({ message: "Investimento não encontrado" })
            res.status(200).json(investiment);
        } catch (error) {
            return res.status(500).send({ message: "Erro ao encontrar investimento", data: error.menssage })
        }
    }

    static async updateInvestment(req, res) {
        const { id } = req.query;
        const updateData = req.body;

        try {
            const existingInvestment = await Investiment.findById(id);
            if (!existingInvestment) return res.status(404).send({ message: "Investimento não encontrado" });

            if (updateData.nameInvestment !== undefined)
                existingInvestment.nameInvestment = updateData.nameInvestment;

            if (updateData.description !== undefined)
                existingInvestment.description = updateData.description;

            if (updateData.value !== undefined)
                existingInvestment.value = updateData.value;

            if (updateData.startDate !== undefined)
                existingInvestment.startDate = updateData.startDate;

            if (updateData.endDate !== undefined)
                existingInvestment.endDate = updateData.endDate;

            if (updateData.category !== undefined)
                existingInvestment.category = updateData.category;

            if (updateData.classification !== undefined)
                existingInvestment.classification = updateData.classification

            if (updateData.isInput !== undefined)
                existingInvestment.isInput = updateData.isInput;

            const updatedInvestment = await existingInvestment.save();
            res.status(201).send({ message: "Investimento atualizado", updatedInvestment });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao atualizar investimento", data: error.message });
        }
    }

    static async deleteInvestment(req, res) {
        const { id } = req.query;
        try {
            const investment = await Investiment.findById(id);
            if (!investment) {
                return res.status(404).send({ message: "Investimento não encontrado" });
            }

            await Investiment.findByIdAndDelete(id);
            res.status(201).send({ message: "Investimento deletado", investment });
        } catch (error) {
            return res.status(500).send({ message: "Erro ao deletar investimento", data: error.message });
        }
    }


}

module.exports = InvestimentController;
