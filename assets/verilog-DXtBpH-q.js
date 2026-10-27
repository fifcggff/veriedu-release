import{c as b}from"./index-CDq4GS7C.js";function u(e,t){const o=new Blob([t],{type:"text/plain;charset=utf-8"}),i=URL.createObjectURL(o),a=document.createElement("a");a.href=i,a.download=e,document.body.appendChild(a),a.click(),a.remove(),URL.revokeObjectURL(i)}function g(e,t){const o=`// Exported from VeriEdu (https://veriedu) — ${new Date().toISOString()}
`;u(`${t||"circuit"}.v`,o+e)}function k(e,t){const o=e.signals.filter(s=>s.role==="input"),i=e.signals.filter(s=>s.role==="output"),a=o.reduce((s,r)=>s+r.bits.length,0),c=i.reduce((s,r)=>s+r.bits.length,0),l=[];let d=0;for(const s of o){const r=s.bits.length;l.push(r>1?`.${s.name}(sw[${d+r-1}:${d}])`:`.${s.name}(sw[${d}])`),d+=r}let n=0;for(const s of i){const r=s.bits.length;l.push(r>1?`.${s.name}(led[${n+r-1}:${n}])`:`.${s.name}(led[${n}])`),n+=r}const h=`// ============================================================
// VeriEdu generated FPGA top module
// Maps "${e.moduleName}" to ${a} board switch(es) and ${c} LED(s).
// Flip the switches on your dev board to drive the LEDs live.
// ============================================================
module top(
  input  [${Math.max(a-1,0)}:0] sw,
  output [${Math.max(c-1,0)}:0] led
);
  ${e.moduleName} u_dut (
    ${l.join(`,
    `)}
  );
endmodule

// ---- design under test ----
${t}
`;u(`${e.moduleName||"circuit"}_top.v`,h)}function $(e){const t=b(e);if(!t.ok||!t.module)return null;const o=t.module.decls.filter(i=>i.kind==="input"||i.kind==="output").map(i=>({name:i.name,dir:i.kind,width:i.width}));return{name:t.module.name||"circuit",ports:o,clk:t.clk,rtl:t.hasClock}}const m=e=>e>1?`[${e-1}:0] `:"";function p(e){var d;const t=e.ports.filter(n=>n.dir==="input"&&n.name!==e.clk),o=e.ports.filter(n=>n.dir==="output"),i=[...e.clk?[`  reg ${e.clk} = 1'b0;`]:[],...t.map(n=>`  reg  ${m(n.width)}${n.name} = 0;`),...o.map(n=>`  wire ${m(n.width)}${n.name};`)].join(`
`),a=e.ports.map(n=>`.${n.name}(${n.name})`).join(", "),c=((d=o[0])==null?void 0:d.name)??"y",l=e.clk?`  // clocked DUT — drive inputs, advance the clock, then self-check
  initial begin
${t.map(n=>`    ${n.name} = 0;`).join(`
`)}
    repeat (8) @(posedge ${e.clk});
    // if (${c} !== /* expected */) $error("mismatch at %0t", $time);
    $display("TB done"); $finish;
  end`:`  // combinational DUT — sweep inputs, settle, then self-check
  initial begin
${t.map(n=>`    ${n.name} = 0; #10;`).join(`
`)}
    // if (${c} !== /* expected */) $error("mismatch");
    $display("TB done"); $finish;
  end`;return`\`timescale 1ns/1ps
// Auto-generated testbench skeleton for "${e.name}". Fill in the expected values.
// Run:  iverilog -o sim ${e.name}.v ${e.name}_tb.v && vvp sim   (view ${e.name}.vcd in GTKWave)
module ${e.name}_tb;
${i}

  ${e.name} dut(${a});
${e.clk?`
  always #5 ${e.clk} = ~${e.clk};   // 100 MHz clock
`:""}
  initial begin
    $dumpfile("${e.name}.vcd");
    $dumpvars(0, ${e.name}_tb);
  end

${l}
endmodule
`}function f(e){const t=[`## Pin constraints (Xilinx XDC) template for "${e.name}".`,"## Replace each PACKAGE_PIN ??? with a real pin from your board's master XDC.",""];for(const o of e.ports)for(let i=0;i<o.width;i++){const a=o.width>1?`${o.name}[${i}]`:o.name;t.push(`set_property -dict { PACKAGE_PIN ???   IOSTANDARD LVCMOS33 } [get_ports { ${a} }];`)}return e.clk&&t.push("","## Clock — set the real period for your board:",`# create_clock -name ${e.clk} -period 10.000 [get_ports ${e.clk}]`),t.join(`
`)+`
`}function w(e){const t=$(e);return t?(u(`${t.name}_tb.v`,p(t)),!0):!1}function x(e){const t=$(e);return t?(u(`${t.name}.xdc`,f(t)),!0):!1}function _(e){const t=$(e);if(!t)return!1;const o=(c,l)=>`==================== FILE: ${c} ====================
${l}
`,i=`${t.name} — VeriEdu project bundle (${t.rtl?"sequential/RTL":"combinational"})
Generated ${new Date().toISOString()}. Split the sections below into separate files.

Simulate (iverilog):
  iverilog -o sim ${t.name}.v ${t.name}_tb.v
  vvp sim
  gtkwave ${t.name}.vcd

Synthesize (Vivado): add ${t.name}.v as a design source and ${t.name}.xdc as a
constraint, then run synthesis/implementation. (Reminder: VeriEdu's built-in
engine is a teaching subset — verify behaviour against iverilog/your tool.)
`,a=o("README.txt",i)+o(`${t.name}.v`,e)+o(`${t.name}_tb.v`,p(t))+o(`${t.name}.xdc`,f(t));return u(`${t.name}_project.txt`,a),!0}export{g as a,k as b,w as c,x as d,_ as e};
