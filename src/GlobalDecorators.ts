function loggedMethod(originalMethod: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const methodName = originalMethod?.name;

    if(!!descriptor.value){
        const originalValue = descriptor.value
        descriptor.value=function replacementMethod(this: any, ...args: any[]) {
            console.log(`LOG: Entering method ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}.`)
            const result = originalValue.call(this, ...args);
            console.log(`LOG: Exiting method ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}. Value type is ${typeof result == "object" ? result?.constructor?.name??"null" : typeof result}. ${tryget(()=>"Value is "+JSONB.stringify(result, undefined, 0, {bigint: true, function: true, get: true, set: true, Infinity: true, NaN: true, NegativeInfinity: true, undefined: true}))??"Unable to get the returned value"}.`)
            return result;
        }
    }
    if(!!descriptor.get){
        const originalGet = descriptor.get
        descriptor.get=function replacementMethod(this: any, ...args: any[]) {
            console.log(`LOG: Entering getter ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}.`)
            const result = originalGet.call(this, ...args);
            console.log(`LOG: Exiting getter ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}. Value type is ${typeof result == "object" ? result?.constructor?.name??"null" : typeof result}. ${tryget(()=>"Value is "+JSONB.stringify(result, undefined, 0, {bigint: true, function: true, get: true, set: true, Infinity: true, NaN: true, NegativeInfinity: true, undefined: true}))??"Unable to get the returned value"}.`)
            return result;
        }
    }
    if(!!descriptor.set){
        const originalSet = descriptor.set
        descriptor.set=function replacementMethod(this: any, ...args: any[]) {
            console.log(`LOG: Entering setter ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}.`)
            const result = originalSet.call(this, ...args);
            console.log(`LOG: Exiting setter ${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}.`)
            return result;
        }
    }/*
    function replacementMethod(this: any, ...args: any[]) {
        console.log(`LOG${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}: Entering method '${methodName}'.`)
        const result = originalMethod.call(this, ...args);
        console.log(`LOG${!!methodName?` <(${methodName})${!!propertyKey?` ${propertyKey}`:""}>`:!!propertyKey?` <${propertyKey}>`:""}: Exiting method '${methodName}'.`)
        return result;
    }
    return replacementMethod as typeof originalMethod;*/
}
globalThis.loggedMethod=loggedMethod
function log(value: any, propertyKey?: string){
    console.log(`LOG ${!!propertyKey?`<${propertyKey}>`:""}: ${JSONB.stringify(value, undefined, 0, {bigint: true, function: true, get: true, set: true, Infinity: true, NaN: true, NegativeInfinity: true, undefined: true})}`)
}
globalThis.log=log
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        if(descriptor!=undefined){
            descriptor.configurable = value;
        }else{
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                configurable: value,
            });
        }
    };
}
globalThis.configurable=configurable
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        if(descriptor!=undefined){
            descriptor.enumerable = value;
        }else{
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                enumerable: value,
            });
        }
    };
}
globalThis.enumerable=enumerable
function writable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {
        if(descriptor!=undefined){
            descriptor.writable = value;
        }else{
            Object.defineProperty(target, propertyKey, {
                ...Object.getOwnPropertyDescriptor(target, propertyKey),
                writable: value,
            });
        }
    };
}
globalThis.writable=writable
const readonlifyMap = new Map<any, true>();

// CLASS DECORATOR
function readonlify<T extends { new (...args: any[]): {} }>(constructor: T) {
const c = class extends constructor {
    constructor(...args: any[]) {
    super(...args);
    if (new.target === c) readonlifyMap.set(this, true);
    }
};
return c;
}
globalThis.readonlify=readonlify

// PROPERTY DECORATOR
function readonly(
target: any,
key: string,
propertyDescriptor?: PropertyDescriptor
) {
let z: any = undefined;
Object.defineProperty(target, key, {
    get() {
    return z;
    },
    set(value) {
    console.log("Set ", value);
    if (readonlifyMap.get(this)) throw new Error();
    z = value;
    }
});
}
globalThis.readonly=readonly