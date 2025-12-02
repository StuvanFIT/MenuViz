import { MenuItem } from "@/types/type"

export const parseMenuImagePrompt = `
    Analyse this restaurant menu image.
    Extract all distinct food and drink items.
    For each item, provide the name, a short enticing description (if not present, infer it briefly), 
    the price (as a string, e.g. "$15"), the category type of dish (e.g. Main Dishes, Specials, Drinks, Desserts, Other) and dietary tags (e.g. Vegan, Gluten-Free, Spicy, Contains Nuts) based on common knowledge or indicators in the text.
    Return a raw JSON array.
`

export const generateMenuItemImagePrompt = (item: MenuItem) => `
    Generate a professional high-end food photography of ${item.name}.
    Description: ${item.description}.
    Style: Michelin star restaurant presentation, macro shot, shallow depth of field, warm inviting lighting, 4k, hyperrealistic.
    The food should look delicious and exactly match the description.
`