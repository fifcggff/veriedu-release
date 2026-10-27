const e=(t,n)=>({zh:t,en:n}),i={"full-adder":{kind:"comb",cases:[{in:{a:0,b:0,cin:0},out:{sum:0,cout:0}},{in:{a:0,b:1,cin:0},out:{sum:1,cout:0}},{in:{a:1,b:1,cin:0},out:{sum:0,cout:1}},{in:{a:1,b:1,cin:1},out:{sum:1,cout:1}},{in:{a:1,b:0,cin:1},out:{sum:0,cout:1}}]},"majority-voter":{kind:"comb",cases:[{in:{a:0,b:0,c:0},out:{y:0}},{in:{a:0,b:1,c:1},out:{y:1}},{in:{a:1,b:0,c:1},out:{y:1}},{in:{a:1,b:0,c:0},out:{y:0}},{in:{a:1,b:1,c:1},out:{y:1}}]},stopwatch:{kind:"seq",inputs:{rst:0,run:1},cycles:6,out:"count",expect:[0,1,2,3,4,5]},"traffic-light":{kind:"seq",inputs:{rst:0},cycles:7,out:"light",expect:[0,1,1,1,2,2,0]},"vending-machine":{kind:"seq",inputs:{rst:0,coin:1},cycles:7,out:"dispense",expect:[0,0,0,1,0,0,1]},"sequence-detector":{kind:"stream",stream:[{din:1},{din:0},{din:1},{din:1},{din:0}],out:"det",expect:[0,0,0,0,1]},lfsr:{kind:"seq",inputs:{},cycles:16,out:"q",expect:[0,1,3,7,14,13,11,6,12,9,2,5,10,4,8,0]}},s=[{id:"full-adder",unit:"u3",starter:`module full_adder(input a, input b, input cin, output sum, output cout);
  // TODO：sum 是 a^b^cin；cout 在至少两位为 1 时为 1（用 ^ & |）
  assign sum  = a;
  assign cout = a;
endmodule`,icon:"➕",level:"beginner",engine:"comb",title:e("全加器","Full Adder"),tagline:e("每个加法器、ALU、CPU 的最小积木。","The atom inside every adder, ALU and CPU."),brief:e("把两位 a、b 和低位进位 cin 相加，得到本位和 sum 与进位 cout。把多个全加器串起来就是行波进位加法器。","Adds bits a, b and a carry-in cin to produce sum and carry-out cout. Chain several and you have a ripple-carry adder."),concepts:[e("异或 = 无进位加","XOR = carry-less add"),e("进位生成 a&b","carry generate a&b"),e("布尔代数","Boolean algebra")],lessons:["adder","operators"],code:`module full_adder(input a, input b, input cin, output sum, output cout);
  assign sum  = a ^ b ^ cin;
  assign cout = (a & b) | (cin & (a ^ b));
endmodule`},{id:"majority-voter",unit:"u1",starter:`module majority(input a, input b, input c, output y);
  // TODO：三选二多数表决（积之和 SOP）
  assign y = a;
endmodule`,icon:"🗳️",level:"inter",engine:"comb",title:e("三模冗余表决器","Triple-Modular Voter"),tagline:e('航天与汽车里靠"少数服从多数"容错。',"How spacecraft and cars tolerate a faulty channel."),brief:e("三个独立模块各给一票 a、b、c，表决器输出多数结果——任意两个一致就采信，单个出错被自动屏蔽。","Three redundant modules each vote a, b, c; the voter outputs the majority, so a single faulty channel is masked."),concepts:[e("多数函数","majority function"),e("容错 / TMR","fault tolerance / TMR"),e("积之和 SOP","sum-of-products")],lessons:["digital-logic","operators"],code:`module majority(input a, input b, input c, output y);
  assign y = (a & b) | (b & c) | (a & c);
endmodule`},{id:"stopwatch",unit:"u4",starter:`module stopwatch(input clk, input rst, input run, output reg [7:0] count);
  // TODO：rst 清零；run=1 每拍 +1；run=0 保持（非阻塞 <=）
  always @(posedge clk) begin
    count <= count;
  end
endmodule`,icon:"⏱️",level:"beginner",engine:"rtl",title:e("秒表计数器","Stopwatch Counter"),tagline:e("start 跑、stop 停、reset 清零。","Run, stop, and reset — your first stateful machine."),brief:e("run 为 1 时每个时钟加一，run 为 0 时保持当前值，rst 立即清零。这就是计时器/分频器的核心。","Counts up each clock while run=1, holds when run=0, and clears on rst. The core of any timer or divider."),concepts:[e("非阻塞 <=","non-blocking <="),e("使能保持","enable / hold"),e("同步复位","sync reset")],lessons:["seq-intro","blocking-nonblocking"],code:`module stopwatch(input clk, input rst, input run, output reg [7:0] count);
  always @(posedge clk) begin
    if (rst) count <= 0;
    else if (run) count <= count + 1;
  end
endmodule`},{id:"traffic-light",unit:"u5",icon:"🚦",level:"inter",engine:"rtl",title:e("交通灯状态机","Traffic-Light FSM"),tagline:e("红→绿→黄循环，每个灯各停留几拍。","Red→green→yellow, each dwelling for a few ticks."),brief:e("一个三状态 FSM 加一个停留计数器：计数到 0 才切换到下一个灯，并为它装入新的停留时间。经典的 case 状态机写法。","A 3-state FSM plus a dwell counter: it only advances to the next light when the timer hits 0, then loads that light's duration. The classic case-based FSM."),concepts:[e("case 状态机","case FSM"),e("停留计数器","dwell timer"),e("状态编码","state encoding")],lessons:["fsm","seq-intro"],code:`module traffic(input clk, input rst, output reg [1:0] light);
  // 0=红 RED  1=绿 GREEN  2=黄 YELLOW
  reg [2:0] timer;
  always @(posedge clk) begin
    if (rst) begin light <= 0; timer <= 0; end
    else if (timer == 0) begin
      case (light)
        0: begin light <= 1; timer <= 2; end   // 红 → 绿
        1: begin light <= 2; timer <= 1; end   // 绿 → 黄
        2: begin light <= 0; timer <= 2; end   // 黄 → 红
        default: begin light <= 0; timer <= 2; end
      endcase
    end else timer <= timer - 1;
  end
endmodule`},{id:"vending-machine",unit:"u5",icon:"🥤",level:"inter",engine:"rtl",title:e("自动售货机","Vending Machine"),tagline:e("投够 3 枚硬币就出货。","Insert three coins and it dispenses."),brief:e("每个时钟 coin=1 代表投入一枚硬币。攒够 3 枚时拉高 dispense 出货并清零，重新开始。状态就是已投币数。",'Each clock with coin=1 inserts one coin. On the third it pulses dispense, resets, and starts over. The state is "coins so far".'),concepts:[e("累加状态","accumulating state"),e("单拍脉冲","single-cycle pulse"),e("条件转移","conditional transition")],lessons:["fsm","seq-intro"],code:`module vending(input clk, input rst, input coin, output reg dispense);
  reg [1:0] cnt;   // coins inserted so far
  always @(posedge clk) begin
    if (rst) begin cnt <= 0; dispense <= 0; end
    else if (coin && cnt == 2) begin dispense <= 1; cnt <= 0; end
    else begin dispense <= 0; cnt <= cnt + (coin ? 1 : 0); end
  end
endmodule`},{id:"sequence-detector",unit:"u5",icon:"🔍",level:"inter",engine:"rtl",title:e("序列检测器 1011","Sequence Detector 1011"),tagline:e("在比特流里发现 1011，支持重叠。","Spots 1011 in a bitstream — overlaps allowed."),brief:e("一个 Mealy/Moore 风格的 FSM，逐拍记住已匹配到 1011 的多长前缀；匹配成功时 det 拉高一拍，并利用重叠继续检测。","An FSM that remembers how much of 1011 has matched so far; on a full match det pulses for one cycle and overlapping continues the search."),concepts:[e("前缀状态","prefix state"),e("重叠检测","overlap"),e("状态转移表","state transition table")],lessons:["fsm","blocking-nonblocking"],code:`module seqdet(input clk, input din, output reg det);
  reg [2:0] s;   // length of the 1011 prefix matched so far
  always @(posedge clk) begin
    case (s)
      0: begin det <= 0;   s <= din ? 1 : 0; end
      1: begin det <= 0;   s <= din ? 1 : 2; end
      2: begin det <= 0;   s <= din ? 3 : 0; end
      3: begin det <= din; s <= din ? 1 : 2; end   // match on the final 1
      default: begin det <= 0; s <= 0; end
    endcase
  end
endmodule`},{id:"lfsr",unit:"u4",icon:"🎲",level:"advanced",engine:"rtl",title:e("伪随机数发生器 (LFSR)","Pseudo-Random Generator (LFSR)"),tagline:e('几个异或门造出"随机"序列。','A handful of XOR gates make a "random" stream.'),brief:e("线性反馈移位寄存器：每拍左移并把高两位的异或反馈回最低位。从 0 出发会走遍 15 个状态再循环——游戏、加扰、自测都用它。","A linear-feedback shift register: each clock it shifts left and feeds the XNOR of the top two bits back in. From 0 it visits 15 states before repeating — used in games, scramblers and self-test."),concepts:[e("移位寄存器","shift register"),e("异或反馈","XOR feedback"),e("最大长度序列","maximal-length sequence")],lessons:["seq-intro","blocking-nonblocking"],code:`module lfsr(input clk, output reg [3:0] q);
  // shift left, feed ~(q3 ^ q2) into the LSB
  always @(posedge clk) q <= {q[2:0], ~(q[3] ^ q[2])};
endmodule`}];export{s as P,i as a};
