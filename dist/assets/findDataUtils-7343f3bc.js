const o=(h,l)=>{const e=[];return l.forEach(r=>{const s=[];r.stations.forEach(a=>{h.forEach(c=>{c==a.id&&s.push({id:a.id,label:a.name})})}),s.length&&e.push({id:r.id,label:r.name,children:s})}),console.log("res",e),e},f=(h,l)=>{const e=[];return l.forEach(r=>{r.children.forEach(s=>{h.forEach(a=>{a===s.value&&e.push([r.value,s.value])})})}),e};export{f as a,o as g};
