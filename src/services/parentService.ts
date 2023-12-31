import { Op } from "sequelize";
import { HandleError } from "../helpers/handlerController";
import Parent from "../models/parent.model";
import { parentData } from "../types/request/parent.request";

class ParentService {
    getParents = async (search?: string): Promise<Parent[]> => {
        //condición de búsqueda
        const searchCondition = Parent.filters(search || "")

        //búsqueda de registros
        const parents = await Parent.findAll({
            paranoid: true,
            where: searchCondition,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })
        if (parents.length === 0) throw new HandleError(404, "No existing users")
        return parents;
    };

    getOneParent = async (id: string): Promise<Parent> => {
        //búsqueda de registro
        const parent = await Parent.findByPk(id, {
            paranoid: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })
        if (!parent) throw new HandleError(404, "No existing parent")
        return parent
    };

    createParent = async (data: parentData): Promise<Parent> => {
        //Validación de existencia de pariente
        const parentExists: Parent | null = await Parent.findOne({ where: { document: data.document } })
        if (parentExists) throw new HandleError(400, "User already exists")

        //Creación de pariente
        const createParent = await Parent.create(data)
        if (!createParent) throw new HandleError(500, "Problem creating parent")
        await createParent.save()

        //Respuesta                
        return createParent;
    };

    updateParent = async (id: string, data: parentData): Promise<Parent> => {
        const parentExists: Parent | null = await Parent.findByPk(id)
        if (!parentExists) throw new HandleError(404, "Parent does not exist")

        //actualizar el usuario   
        const updateParent = await parentExists.update(data);
        if (!updateParent) throw new HandleError(500, "Problem updating user")
        await updateParent.save()

        //respuesta
        return updateParent;
    };

    deleteParent = async (id: string): Promise<boolean> => {
        const parentExists: Parent | null = await Parent.findByPk(id)
        if (!parentExists) throw new HandleError(404, "Parent does not exist")

        await Parent.destroy({ where: { id: id } })
        return true;
    };
}

export default ParentService