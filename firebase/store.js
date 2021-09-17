import store from "./config";


export default async function add_recipe(email, recipeName, recipe) {
    try {
        const rec = {
            email: email,
            recipeName: recipeName,
            items: recipe
        }
        const newDoc = await fs.collection("recipes").add(rec);
        newDoc.then((res) => console.log(res)).catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
}