import type { RawMessage } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData } from "@minecraft/server-ui";

export const customElementTypes = [
    ModalFormData.prototype.title as (
        titleText: RawMessage | string
    ) => ModalFormData,
    ModalFormData.prototype.textField as (
        label: RawMessage | string,
        placeholderText: RawMessage | string,
        defaultValue?: RawMessage | string
    ) => ModalFormData,
    ModalFormData.prototype.dropdown as (
        label: RawMessage | string,
        options: (RawMessage | string)[],
        defaultValueIndex?: number
    ) => ModalFormData,
    ModalFormData.prototype.toggle as (
        label: RawMessage | string,
        defaultValue?: boolean
    ) => ModalFormData,
    ModalFormData.prototype.slider as (
        label: RawMessage | string,
        minimumValue: number,
        maximumValue: number,
        valueStep: number,
        defaultValue?: number
    ) => ModalFormData,
    ActionFormData.prototype.body as (
        bodyText: RawMessage | string
    ) => ActionFormData,
    ActionFormData.prototype.button as (
        text: RawMessage | string,
        iconPath?: string
    ) => ActionFormData,
    MessageFormData.prototype.button1 as (
        text: RawMessage | string
    ) => MessageFormData,
    MessageFormData.prototype.button2 as (
        text: RawMessage | string
    ) => MessageFormData,
    ModalFormData.prototype.submitButton as (
        submitButtonText: RawMessage | string
    ) => ModalFormData,
];
