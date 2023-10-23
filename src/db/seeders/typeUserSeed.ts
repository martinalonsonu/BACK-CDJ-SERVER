import TypeUser from "../../models/typeUser.model"

const typeUserData: any[] = [
    { name: 'Administrador' },
    { name: 'Alumno' },
    { name: 'Apoderado' },
    { name: 'Docente' },
    { name: 'Administrativo' },
]

const seedTypeUsers = async () => {
    await TypeUser.bulkCreate(typeUserData)
}

seedTypeUsers().then(() => {
    console.log('::Seeders: Tipos de usuarios insertados con éxito::')
}).catch((error) => {
    console.error('Error al insertar los tipos de usuarios: ', error)
})