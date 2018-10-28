let $textarea = $("<textarea class='clipboard-registry' style='position: absolute;pointer-events: none;opacity: 0;top: 0;width: 0;height: 0;'></textarea>");
$("body").append($textarea);

export const clipboardUtils = {
    copy (value) {
        $textarea.val(value);
        $textarea.focus();
        $textarea[0].setSelectionRange(0, $textarea[0].value.length);
        document.execCommand("copy");
    }
};
