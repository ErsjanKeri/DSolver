import React, { useEffect, useState }from "react";

import { Select, Space } from "antd";
import i18next from "i18next";

function LanguagePicker() {
    // i18n

    const items = [
        {
            label: "🇩🇪 Deutsch",
            value: "de"
        },
        {
            label: "🇬🇧 English",
            value: "en"
        },
        {
            label: "🇦🇱 Shqip",
            value: "sq"
        },
        {
            label: "🇹🇷 Türkçe",
            value: "tr"
        }
        // {
        //     label: "🇨🇳 中文",
        //     value: "zh"
        // }
    ]



    const [lang, setLang] = useState( localStorage.getItem("lang") === null ? items[0].value : localStorage.getItem("lang"))

    return (
            
            <Select
                defaultValue={lang}
                options={items}
                style={{width: "8rem"}}
                onChange={(e) => {
                    localStorage.setItem("lang", e)
                    setLang(e)
                    i18next.changeLanguage(e)
                    window.location.reload()
                }}
                />
                    
    )

}
export default LanguagePicker