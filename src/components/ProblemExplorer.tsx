"use client";
import { useState } from "react";
const problems=[
 {title:"Лужи не уходят",text:"Поверхностная вода не успевает впитаться в плотный грунт.",solution:"Нужен сбор воды с поверхности и безопасная точка сброса."},
 {title:"Мокнет фундамент",text:"Вода скапливается у стен и создаёт постоянное давление на конструкцию.",solution:"Пристенный или кольцевой дренаж с контролем глубины заложения."},
 {title:"Вода в подвале",text:"Грунтовая вода поднимается до подошвы и находит слабые места гидроизоляции.",solution:"Глубинное водопонижение, колодец и при необходимости насос."},
 {title:"Гибнет газон",text:"На участке есть понижение рельефа, где собирается весь сток после дождя.",solution:"Разделяем поверхностный и глубинный контуры, восстанавливаем уклон."},
];
export function ProblemExplorer(){const [active,setActive]=useState(0);const item=problems[active];return <div className="problem-explorer"><div className="problem-tabs" role="tablist">{problems.map((p,i)=><button className={active===i?"active":""} role="tab" aria-selected={active===i} onClick={()=>setActive(i)} key={p.title}>{p.title}</button>)}</div><div className="problem-detail"><div className="problem-number">0{active+1}<span>/04</span></div><div><h3>{item.title}</h3><p>{item.text}</p><div className="solution"><span>Инженерная гипотеза</span><strong>{item.solution}</strong></div></div><div className="problem-visual" aria-hidden="true"><div className="water-ring"/><div className="contour contour-one"/><div className="contour contour-two"/><div className="flow-arrow">↘</div></div></div></div>}
