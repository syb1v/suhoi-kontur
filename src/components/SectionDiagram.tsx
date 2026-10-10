"use client";
import { useState } from "react";
const layers=[
 ["01","Грунт","Отводим лишнюю воду из насыщенного слоя, не нарушая устойчивость участка."],
 ["02","Фильтрующий слой","Отделяет мелкие частицы грунта и помогает сохранять пропускную способность системы."],
 ["03","Перфорированная труба","Собирает воду по трассе и направляет её к колодцу или точке самотёка."],
 ["04","Геотекстиль","Не даёт грунту смешиваться с фильтрующим материалом и заиливать контур."],
];
export function SectionDiagram(){const [active,setActive]=useState(2);return <div className="section-diagram"><div className="diagram-cutaway"><div className="soil-layer layer-soil"><span>грунт</span></div><div className="soil-layer layer-stone"><span>фильтрация</span></div><div className="soil-layer layer-pipe"><span>◌ ◌ ◌</span></div><div className="soil-layer layer-textile"><span>геотекстиль</span></div><div className="pipe-water"/></div><div className="layer-list">{layers.map(([number,title,text],i)=><button className={active===i?"selected":""} onClick={()=>setActive(i)} key={number}><span>{number}</span><strong>{title}</strong><p>{active===i?text:"Нажмите, чтобы узнать роль слоя"}</p></button>)}</div></div>}
