## 关于思维方式的几点共识 ##

###关于工程化###
   工程化是将成熟解决方案和实践经验用工具和约定焊接起来并形成统一的操作规范，实现工业化生产的过程。其具体可见部分是zeus的命令，我们给业务开发的人员暴露出简洁的，最实用的的操作，让大家把精力集中在业务开发阶段，提升整体的工作效率。所以并不是暴露出越多的功能，越复杂的操作接口就好，而是更集中，更有有机感，像一个生物一样，有手有脚，有眼睛有鼻子。当你面对他，简单得不能再简单。对于有精力有余力的同学，可以去进一步研究包装背后的更多功能，或者再去改造他，但是改造的初衷一定要考虑绝大多数的同学在做业务开发，为他们服务，而不是为了技术而技术。

###关于解决方案###
   解决方案在技术选型上是一个单纯的内部统一独立体，他不是为了万能目的去堆积的一个大杂烩，比如同样的加载器，方案已经确定，那就是统一的，用了commonjs，就不要再用requirejs, 再比如，确定不用coffee script就不要某些地方用，某些地方不用。 这些东西本身都只是工具，绝大多数的场合用某一种工具也都能解决另外一种工具所标榜的特定问题，API不能满足，也有与之相关的经验可以配合解决，除非选型很非主流，导致在业界没有经验的沉淀，那另当别论。不过这个问题在我们最初的选型中我们已经尽可能避免了。

   解决方案是一把有特点的刀，而不是瑞士军刀，他可以让你在干某件事的时候顺利解决这件事上绝大多数的问题，而不是绝对完美的解决所有的问题，上战场，你需要带的是某一件武器，而不是瑞士军刀。 想象一下作为骑兵，带着一把锋利的长矛，一路突刺，这是最合适的选择，你专心专用，轻装上阵，所向披靡，把自己的伤亡程度降低到最小。 当然也会在很小的概率中，遇到有人会越过开你的矛尖范围，甚至跳到你的马上来，那时你可以用匕首和他肉搏，不过那匕首最好足够的轻，并且不会在骑马的过程中掉下，那个匕首不应该是另一个解决方案，而应该是你积累的经验和技巧。

   如果有实在有特定的业务需要没有考虑到，我们可以具体分析，先看这个问题是否足够重要，然后再看是否需要做一个新的解决方案，集成到工程化中去。这个需要你们在后面的时间去扩充了，目前我们给的只是一个新起点，而不是终点。

###提升思维维度，尽可能做权宜###
   较多技术人员有时候有一个职业病，那就是容易陷入到纯数字化的逻辑误区，1就是1，0就是0，在某一个问题中做到绝对，但是随着你的思维维度的提升，全局观的提升，你会发现当你顾全大局的时候，之前放在一个小范围做的一个很完美的东西，和你另外一个需要考虑的东西之间，存在着很大的资源竞争。这个时候你需要做的是权宜的艺术，否则在这个层面上会走的很艰难。 提升全局观之后，对于问题的看法也会变得有所成长。

###追求更高的性价比而不是性###
   就拿选型来说，可能有两个工具面临选择，一个工具比另一个工具速度要快3倍，但是同时也会带来维护的复杂性，或者有可能还存在其他潜在问题，充满了不确定，需要我们付出人力去调研。

   这个时候，我们最先要看的是这个3倍到底是一个什么样的概念，广告和软文标榜的都是把视众巧妙的往有利于自己的方向去倾斜，从1毫秒到3毫秒是3倍，从1秒到3秒也是3倍，放眼全局，如果这个问题本身是微不足道的，那么1ms和3ms几乎是没有差别，我们应该在价可以衡量时选择性价比最高的，假设价本身无法衡量之时，就选择最确定的，最熟悉的。

###站在时间的长河看问题###
   很多年前，前端在提倡语义布局，在提倡yslow的性能军规，在提倡样式、行为、结构分离。站在现在看，这些提倡还是具有很大的价值，也在很多前端新人培训中被过高地教条主义化了。随着环境在不断变化（机器性能、浏览器、应用场景），前端技术本身也在迅速的发展和不断的探索中，这些东西不能成为天花板和牛角尖，否则会成为前端工程师发展的瓶颈。

   现在有很多新的技术，都已经开始突破了这些陈规的限制，比如css in js，这个就突破了分离的原则，比如很多大公司做的打包方案，和按需加载的原则有出入，那是因为考虑了场景和用户的缓存率，同时考虑现代网络和浏览器的工作效率，做出的选择。这样的事情放在过去，是需要被重新评估，但是放在现在的某一个特定场景，是非常合适的。 再比如table布局，大家都很反感，但是他可以作为一种成本很低的hack方案去解决某一个特定的棘手问题，这没有什么不可以的。 

   当然，我们也没有否定所有这一切，任何时代的规则都有他的历史来由，以及目的，假如我们真正了解这些目的结合我们现在的情况来看，我们就可以灵活的做出什么时候遵守，什么时候需要突破了。

   前端性能这块，在10年-13年之间，在大公司内部非常火爆，BAT几乎都开了十多人的团队专门研究解决性能问题，在2012年我就是百度前端性能小组的负责人，当时带了7个同学负责百度整体的前端性能，在性能的基础技术研究上，我们深入到了浏览器内核的在重绘及内存回收时每一个具体实现算法和差异，甚至在用字符串+ 和数组join的问题上，我们整出了各种不同JS引擎下，随数量级增加的曲线表现还有和其他因素之间的相关性和数据拟合。 在宏观上，我们产出了性能检测、性能优化、性能监控一整套的解决方案和各种平台、工具。 之前这块一直开展的很好，很新颖，也很有逼格。但是我们现在已经把这个team给解散了，因为随着浏览器的发展，很多问题变得不再重要。投入产出比已经不再合适了。 

   随着机器性价比的提升，在服务端性能方面，很多时候，为了达到同样的目标，可能需要多投入5个人力4个月的时间，这样算下来是一笔基础的投入费用，而考虑到人力的稀缺性，招人的困难程度，对于这5个人力4个月，在其他项目中产生的空缺存在额外的机会成本的流失，而往往我们多花点钱加点机器解决这个问题，要划算很多。而对于竞争尤其激烈，快节奏的互联网创业公司，在人力和机会成本上流失效应会更加放大。

###注重基础技术，提升判断力###
   看过《三体》的同学，都知道三体人干了一件牛逼的事，那就是用智子锁死了地球的基础物理的发展，从而导致应用技术发展得看上去非常美好，舰队规模宏大，而却败给了三体人的一个强互作用力的“水滴”。这个问题告诉我们基础技术上我们一定要重视起来，否则繁荣只是表面。在互联网的大环境中，好的技术是open的，我们要善于把这些基础研究外包给社区，享受经验和成果。

   要经常保持对于新技术的持续观察，也需要有敏锐判断力，光看到食物是不行的，还需要判断这个食物是能吃的，而不是毒药，或者瘾药，前者能葬送你，后者会禁锢你。

###最终为产品负责###
   技术再牛，最终也是要为产品负责，回归到解决产品问题，这样才能落地，接地气，否则和纸上谈兵没有太大区别，只是我们为自己编织的一个乌托邦。
