export function convertToSNBTFormat(parsedNBT: { structure: { block_indices: any[][]; palette: { default: { block_palette: any[]; }; }; }; size: number[]; }) {
    //var blocks = []
    var blocksb: { pos: number[]; state: any; }[] = [];
    parsedNBT.structure.block_indices[0].forEach((b: number, i: number) => b != -1
        ? blocksb.push({
            pos: [
                i % parsedNBT.size[2],
                Math.floor(i / (parsedNBT.size[0] * parsedNBT.size[2])),
                Math.floor(
                    (i % (parsedNBT.size[0] * parsedNBT.size[2])) /
                    parsedNBT.size[0]
                ),
            ],
            state: b,
        })
        : undefined
    ); /*
    var b = parsedNBT.structure.block_indices[0][0]
    for(let y = 0; y<parsedNBT.size[0]; y++){
        for(let z = 0; z<parsedNBT.size[0]; z++){
            for(let x = 0; x<parsedNBT.size[0]; x++){
                b=parsedNBT.structure.block_indices[0][(y*parsedNBT.size[0]*parsedNBT.size[2])+(z*parsedNBT.size[0])+x]
                !!b?blocks.push({pos: [x, y, z], state: b}):undefined
            }
        }
    }*/









    return {
        blocks: blocksb,
        palette: parsedNBT.structure.palette.default.block_palette.map((v: { name: any; states: any; }) => ({
            Name: v.name,
            Properties: v.states,
        })),
        nbt_type: "cnvtsnbt",
        size: parsedNBT.size,
    };
}
