import { ContainerSlot, Player, ItemStack, ItemLockMode, type Vector3, EnchantmentTypes } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { componentTypeEnum } from "../enums/componentTypeEnum";
import { durabilityComponentTypeEnum } from "../enums/durabilityComponentTypeEnum";
import { enchantableComponentTypeEnum } from "../enums/enchantableComponentTypeEnum";
import type { ItemJSONParseInput } from "../enums/ItemJSONParseInput";
import { propertyTypeEnum } from "../enums/propertyTypeEnum";

export function itemJSONPropertiesEvalCT(
    itemJSON: ItemJSONParseInput,
    containerSlot?: ContainerSlot,
    player?: Player | executeCommandPlayerW
) {
    /*
    let item = {getComponent: (string)=>(string=="enchantable"?{addEnchantment: (enchantment)=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull"), addEnchantments: (enchantments)=>(enchantments.forEach(enchantment=>(!(compareArraysB(Object.keys(enchantment), ["type", "level"]))?(()=>{throw(TypeError("Not A Valid Enchantment"))})():(typeof enchantment.type!="String")?(()=>{throw(TypeError("Property 'type' of 'Enchantment' must be of type 'number'. "))})():(typeof enchantment.level!="Number")?(()=>{throw(TypeError("Property 'level' of 'Enchantment' must be of type 'number'. "))})():"successfull")))}:"somethingelse")}*/
    let ij = itemJSON;
    ij.force ??= false;
    let sp = player;
    let item = containerSlot;
    if (!!ij.new) {
        item.setItem(new ItemStack(ij.new[0], ij.new[1]));
    }

    const itemPropertyEnum = {
        components: (property: [string, any]) => Object.entries(property[1]).forEach((vb) => itemComponentEnum[componentTypeEnum[vb[0] as componentTypeEnum]](vb)
        ),
        nameTag: (property: [string, any]) => property[1] !== item.nameTag || ij.force
            ? (item.nameTag = property[1])
            : false,
        lore: (property: [string, string[] | undefined | null]) => property[1] !== item.getLore() || ij.force
            ? item.setLore(property[1])
            : false,
        amount: (property: [string, number]) => property[1] != item.amount || ij.force
            ? (item.amount = property[1])
            : false,
        keepOnDeath: (property: [string, boolean]) => property[1] != item.keepOnDeath || ij.force
            ? (item.keepOnDeath = property[1])
            : false,
        lockMode: (property: [string, ItemLockMode]) => property[1] != item.lockMode || ij.force
            ? (item.lockMode = property[1])
            : false,
        canPlaceOn: (property: [string, string[] | undefined | null]) => property[1] !== item.getCanPlaceOn() || ij.force
            ? item.setCanPlaceOn(property[1])
            : false,
        canDestroy: (property: [string, string[] | undefined | null]) => property[1] !== item.getCanDestroy() || ij.force
            ? item.setCanDestroy(property[1])
            : false,
        dynamicProperties: (
            property: [
                string,
                ([
                    string,
                    string | number | boolean | Vector3 | undefined
                ][] |
                    Record<
                        string, string | number | boolean | Vector3 | undefined
                    >)
            ]
        ) => property[1] instanceof Array
                ? (
                    property[1] as [
                        string,
                        string | number | boolean | Vector3
                    ][]
                ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1]))
                : Object.entries(
                    property[1] as Record<
                        string, string | number | boolean | Vector3
                    >
                ).forEach((vc) => item.setDynamicProperty(vc[0], vc[1])),
        clearDynamicProperties: (property: [string, any]) => item.clearDynamicProperties(),
        removeDynamicProperties: (property: [string, string[]]) => property[1].forEach((v) => item.setDynamicProperty(v)),
        removeDynamicProperty: (property: [string, string]) => item.setDynamicProperty(property[1]),
    };
    const itemComponentEnum = {
        enchantable: (property: [string, any]) => Object.entries(property[1]).forEach((vc: [string, any]) => itemEnchantableComponentEnum[enchantableComponentTypeEnum[vc[0] as enchantableComponentTypeEnum]](vc)
        ),
        durability: (property: [string, any]) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage =
                    itemb.getComponent("durability").maxDurability -
                    property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v: [string, [string, number]]) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0] as durabilityComponentTypeEnum]](v[1])
            ),
        damage: (property: [string, any]) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = property[1];
                item.setItem(itemb);
            })()
            : Object.entries(property[1]).forEach((v: [string, number]) => itemDurabilityComponentEnum[durabilityComponentTypeEnum[v[0] as durabilityComponentTypeEnum]](v)
            ),
        food: (property?: [string, any]) => { },
        cooldown: (property?: [string, any]) => { },
    };
    const itemEnchantableComponentEnum = {
        addEnchantment: (property: [string, any]) => property[1] instanceof Array
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").addEnchantments(
                    property[1].map((v) => ({
                        level: v.level,
                        type: EnchantmentTypes.get(v.type),
                    }))
                );
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("enchantable").addEnchantment({
                    level: property[1].level,
                    type: EnchantmentTypes.get(property[1].type),
                });
                item.setItem(itemb);
            })(),
        addEnchantments: (property: [string, any]) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").addEnchantments(
                property[1].map((v: { level: number; type: string; }) => ({
                    level: v.level,
                    type: EnchantmentTypes.get(v.type),
                }))
            );
            item.setItem(itemb);
        })(),
        removeEnchantment: (property: [string, any]) => property[1] instanceof Array
            ? property[1].forEach((v) => (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .removeEnchantment(v);
                item.setItem(itemb);
            })()
            )
            : (() => {
                let itemb = item.getItem();
                itemb
                    .getComponent("enchantable")
                    .removeEnchantment(property[1]);
                item.setItem(itemb);
            })(),
        removeAllEnchantments: (property: [string, any]) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("enchantable").removeAllEnchantments();
            item.setItem(itemb);
        })(),
    };
    const itemDurabilityComponentEnum = {
        durability: (property: [string, number]) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage =
                itemb.getComponent("durability").maxDurability -
                property[1];
            item.setItem(itemb);
        })(),
        damage: (property: [string, number]) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = property[1];
            item.setItem(itemb);
        })(),
        repair: (property: [string, number]) => typeof property[1] == "number"
            ? (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = Math.max(
                    0,
                    itemb.getComponent("durability").damage - property[1]
                );
                item.setItem(itemb);
            })()
            : (() => {
                let itemb = item.getItem();
                itemb.getComponent("durability").damage = 0;
                item.setItem(itemb);
            })(),
        setDurabilityToMax: (property: [string, any]) => (() => {
            let itemb = item.getItem();
            itemb.getComponent("durability").damage = 0;
            item.setItem(itemb);
        })(),
    };
    Object.entries(ij)
        .filter(
            (v) => !["force", "source", "id", "type", "itemId", "new"].includes(
                v[0]
            )
        )
        .forEach((va) => itemPropertyEnum[propertyTypeEnum[va[0] as propertyTypeEnum]](va as any));
    return item;
    /*

    ij = {name: "sazx", components: {enchantable: {add: [{type: "fire_aspect", level: 2}, {type: "sharpness", level: 5}, {type: "looting", level: 3}, {type: "knockback", level: 2}]}}}*/
}
