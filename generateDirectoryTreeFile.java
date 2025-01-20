
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONStringer;

public class generateDirectoryTreeFile {
    public static String optionalModuleObjectImportFilePathsImportMapOut = "export type optionalModuleObjectImportFilePathsImportMap = {";

    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("BP/src/directoryTree.ts");
        PrintWriter outFile = new PrintWriter(file);
        ArrayList<String> src = new ArrayList<>();
        ArrayList<String> scripts = new ArrayList<>();
        ArrayList<String> declaration = new ArrayList<>();

        try (Stream<Path> paths = Files.walk(Paths.get("BP/src"))) {
            paths.filter(Files::isRegularFile).forEach(v -> {
                if(v.toString().endsWith(".ts") && !v.toString().endsWith(".d.ts")){
                    src.add(v.toString().replaceAll("\\\\", "/"));
                }
            });
        }catch(Exception e){
            outFile.close();
            System.err.println(e);
            System.exit(1);
        }

        try (Stream<Path> paths = Files.walk(Paths.get("BP/scripts"))) {
            paths.filter(Files::isRegularFile).forEach(v -> {
                if(v.toString().endsWith(".js")){
                    scripts.add(v.toString().replaceAll("\\\\", "/"));
                }
            });
        }catch(Exception e){
            outFile.close();
            System.err.println(e);
            System.exit(1);
        }

        try (Stream<Path> paths = Files.walk(Paths.get("BP/declaration"))) {
            paths.filter(Files::isRegularFile).forEach(v -> {
                if(v.toString().endsWith(".d.ts")){
                    declaration.add(v.toString().replaceAll("\\\\", "/"));
                }
            });
        }catch(Exception e){
            outFile.close();
            System.err.println(e);
            System.exit(1);
        }
        src.sort((e1, e2)->e1.compareTo(e2));
        scripts.sort((e1, e2)->e1.compareTo(e2));
        declaration.sort((e1, e2)->e1.compareTo(e2));

        try {
            outFile.flush();
            outFile.println("export const src = " + new JSONArray(src.toArray()).toString(4) + ";");
            outFile.println("export const scripts = " + new JSONArray(scripts.toArray()).toString(4) + ";");
            outFile.println("export const declaration = " + new JSONArray(declaration.toArray()).toString(4) + ";");
            outFile.println("export const optionalModuleObjectImportFilePaths = " + new JSONArray(scripts.stream().filter(v->v.matches("BP\\/scripts\\/modules\\/[a-zA-Z0-9\\._\\-]+\\/.*")).toArray()).toString(4) + " as const;");
            Map<String, ArrayList<String>> moduleOptionalImportPathMap = new HashMap<String, ArrayList<String>>();
            scripts.stream().filter(v->v.matches("BP\\/scripts\\/modules\\/[a-zA-Z0-9\\._\\-]+\\/.*")).forEach(v->{
                if(!moduleOptionalImportPathMap.containsKey(v.split("/")[3])){
                    moduleOptionalImportPathMap.put(v.split("/")[3], new ArrayList<String>());
                }
                moduleOptionalImportPathMap.get(v.split("/")[3]).add(v);
            });
            outFile.println("export const moduleOptionalImportPathMap = " + new JSONObject(moduleOptionalImportPathMap).toString(4) + " as const;");
            scripts.stream().filter(v->v.matches("BP\\/scripts\\/modules\\/[a-zA-Z0-9\\._\\-]+\\/.*")).forEach(v->{
                optionalModuleObjectImportFilePathsImportMapOut += "\n    " + JSONStringer.valueToString(v) + ": typeof import(" + JSONStringer.valueToString(v.substring(0, v.length() - 3).replace("BP/scripts", ".")) + "),";
            });
            optionalModuleObjectImportFilePathsImportMapOut += "\n}";
            outFile.println(optionalModuleObjectImportFilePathsImportMapOut);
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        } finally {
            outFile.close();
        }
    }
}
