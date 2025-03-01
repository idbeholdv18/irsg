import fs from "fs-extra";
import path from "path";
import ejs from "ejs";

const TEMPLATES_DIR = path.join(__dirname, "..", "templates", "slice");

export const generateSlice = async (sliceName: string) => {
  const sliceDir = path.join(process.cwd(), "src", "slices", sliceName);

  try {
    await fs.ensureDir(sliceDir);
    await fs.ensureDir(path.join(sliceDir, "components"));

    const indexTemplate = await fs.readFile(
      path.join(TEMPLATES_DIR, "index.ts.ejs"),
      "utf-8"
    );
    const indexContent = ejs.render(indexTemplate, { sliceName });
    await fs.writeFile(path.join(sliceDir, "index.ts"), indexContent);

    const componentTemplate = await fs.readFile(
      path.join(TEMPLATES_DIR, "component.tsx.ejs"),
      "utf-8"
    );
    const componentContent = ejs.render(componentTemplate, { sliceName });
    await fs.writeFile(
      path.join(sliceDir, "components", `${sliceName}Component.tsx`),
      componentContent
    );

    console.log(`Слайс '${sliceName}' успешно создан!`);
  } catch (error) {
    console.error("Ошибка при создании слайса:", error);
  }
};
