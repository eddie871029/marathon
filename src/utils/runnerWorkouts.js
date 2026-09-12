// Exercise Database for Runners with Real Human Demonstration Videos
export const RUNNER_WORKOUTS = {
  strength: {
    id: 'strength',
    title: '跑者專屬下肢與核心肌力訓練',
    subtitle: '強化單腳支撐、臀中肌穩定、阿基里斯腱與骨盆抗旋轉',
    category: '肌力與穩定性',
    defaultWorkSec: 40,
    defaultRestSec: 20,
    defaultRounds: 3,
    color: '#fc4c02',
    accentClass: 'badge-orange',
    description: '專為跑者設計的自重肌力課表，強化單側平衡、核心抗伸展與後側動力鏈，有效預防 ITBS（跑者膝）、髕骨股骨疼痛症候群及足底筋膜炎。',
    exercises: [
      {
        id: 's1',
        name: '單腳羅馬尼亞硬舉 + 提膝衝刺',
        enName: 'Single-Leg RDL to Knee Drive',
        targetMuscles: ['臀大肌', '膕繩肌 (後腿腱)', '核心', '足踝穩定肌'],
        workSec: 40,
        restSec: 20,
        difficulty: '中級',
        purpose: '強化單腳支撐平衡與後側鏈離心控制，頂部提膝模擬跑步推蹬期。',
        videoSearchQuery: 'Single+Leg+RDL+to+Knee+Drive+exercise+form+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Single+Leg+RDL+to+Knee+Drive+exercise+form',
        realCoachFocus: '真人教練示範重點：支撐腳膝蓋微彎保持彈性，髖部向後推 (Hinge) 直至背部水平，起身瞬間臀部夾緊並爆發提膝至 90 度。',
        cues: [
          '支撐腳微屈，以髖部為軸心向後推（Hinge），背部保持打直。',
          '後腿向後延伸，雙手自然下垂，軀幹與後腿呈一直線。',
          '臀部發力將身體拉回，順勢將後腿向前上方提膝至 90 度，骨盆保持水平不歪斜。',
          '每組前 20 秒左腳，後 20 秒右腳。'
        ],
        mistakes: ['駝背或下背拱起', '支撐腳膝蓋過度向前內扣', '骨盆翻轉朝外'],
        animationType: 'rdl'
      },
      {
        id: 's2',
        name: '跑者保加利亞分腿蹲 / 後踏弓步提膝',
        enName: 'Reverse Lunge to High Knee',
        targetMuscles: ['股四頭肌', '臀大肌', '髂腰肌', '小腿'],
        workSec: 40,
        restSec: 20,
        difficulty: '中級',
        purpose: '增強單腳深層肌力與骨盆控制，改善跨步推蹬力量。',
        videoSearchQuery: 'Reverse+Lunge+to+High+Knee+exercise+form+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Reverse+Lunge+to+High+Knee+exercise',
        realCoachFocus: '真人教練示範重點：後跨步時雙膝均成 90 度垂直下沉，前腳跟踩實，向上推進時藉由臀肌發力將後腿直推至胸前。',
        cues: [
          '單腳向後大步跨出，雙膝皆彎曲約 90 度下沉，前膝不超過腳尖。',
          '前腳全腳掌踩實地面，臀部與大腿前側發力推起身體。',
          '起身時將後腳快速向上提膝至胸前，核心收緊維持 1 秒平衡。',
          '左右腳各 20 秒交替或單邊輪流。'
        ],
        mistakes: ['重心過度前傾壓迫膝蓋', '前腳腳跟離地', '身體前後晃動缺乏核心張力'],
        animationType: 'lunge'
      },
      {
        id: 's3',
        name: '單腳臀橋與膕繩肌等長收縮',
        enName: 'Single-Leg Glute Bridge',
        targetMuscles: ['臀大肌', '膕繩肌', '下背豎脊肌', '骨盆底肌'],
        workSec: 40,
        restSec: 20,
        difficulty: '基礎',
        purpose: '直接喚醒跑步動力源（臀大肌），避免「臀肌失憶症」導致膝蓋與腰部代償。',
        videoSearchQuery: 'Single+Leg+Glute+Bridge+exercise+form',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Single+Leg+Glute+Bridge+exercise+form',
        realCoachFocus: '真人教練示範重點：下背部不可超伸，單腳腳跟往下踩將骨盆推起至水平，在最高點主動收縮臀肌 2 秒。',
        cues: [
          '仰臥屈膝，雙腳與肩同寬，將一隻腳抬離地面或伸直。',
          '支撐腳腳跟發力往下踩，將骨盆頂起至大腿與軀幹呈一直線。',
          '在頂峰用力收縮臀大肌 1~2 秒，下背不超伸。',
          '緩慢下放，左右腳各 20 秒。'
        ],
        mistakes: ['用腰部向上頂（骨盆過度前傾）', '支撐膝蓋往內扣', '頸部與肩膀過度緊繃'],
        animationType: 'bridge'
      },
      {
        id: 's4',
        name: '側棒式抬腿 (跑者臀中肌王牌)',
        enName: 'Side Plank with Leg Lift',
        targetMuscles: ['臀中肌', '腹斜肌', '腰方肌', '闊筋膜張肌'],
        workSec: 40,
        restSec: 20,
        difficulty: '中高級',
        purpose: '強化臀中肌防止跑步著地時骨盆下墜（Trendelenburg 步態），預防 ITBS 跑者膝。',
        videoSearchQuery: 'Side+Plank+with+Leg+Lift+exercise+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Side+Plank+with+Leg+Lift+exercise+runners',
        realCoachFocus: '真人教練示範重點：肘關節位於肩膀正下方，側腹與臀部將骨盆頂高呈直線，上方腳抬起時腳尖微朝前（不可向上翻天）。',
        cues: [
          '側臥以單肘支撐地面，手肘在肩膀正下方，雙腿併攏伸直。',
          '收緊核心與臀部，將骨盆抬離地面，頭部、軀幹、腳踝呈一條直線。',
          '上方腳穩定向上抬起約 30 度（腳尖朝前微內旋，勿朝天），緩慢下放。',
          '前 20 秒左側，後 20 秒右側。'
        ],
        mistakes: ['骨盆下沉或向後旋轉', '上方腳尖向上翻（變成大腿前側發力）', '憋氣不呼吸'],
        animationType: 'sidePlank'
      },
      {
        id: 's5',
        name: '死蟲式對角動力鏈延伸',
        enName: 'Dead Bug Runner Cross-Drive',
        targetMuscles: ['腹橫肌', '腹直肌', '對角筋膜鏈', '髖屈肌'],
        workSec: 40,
        restSec: 20,
        difficulty: '基礎',
        purpose: '建立強悍的抗伸展核心穩定性，強化跑步時上肢擺臂與下肢擺腿的對角動力傳遞。',
        videoSearchQuery: 'Dead+Bug+exercise+form+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Dead+Bug+exercise+form+runners',
        realCoachFocus: '真人教練示範重點：肚臍收緊將腰部死死貼平地面，對角手腳向外延伸時不可憋氣，下背絕不可出現縫隙。',
        cues: [
          '平躺於地，雙手垂直向上伸直，雙腿屈膝 90 度抬起（桌面姿勢）。',
          '吐氣時將肚臍向脊椎方向收緊，下背部緊貼地面（絕不能有空隙）。',
          '對角線的右手與左腿緩慢向外向下延伸至接近地面，維持 1 秒。',
          '吸氣緩慢收回，交替另一側對角線手腳。'
        ],
        mistakes: ['下背部離開地面拱起', '速度過快失去核心張力', '頸部過度用力'],
        animationType: 'deadbug'
      },
      {
        id: 's6',
        name: '比目魚肌與腓腸肌離心提踵',
        enName: 'Soleus & Gastrocnemius Eccentric Calf Raises',
        targetMuscles: ['比目魚肌 (屈膝)', '腓腸肌 (直膝)', '阿基里斯腱', '足底肌群'],
        workSec: 40,
        restSec: 20,
        difficulty: '基礎',
        purpose: '強化比目魚肌（承受跑步時 6-8 倍體重衝擊力）與阿基里斯腱儲能彈性，預防小腿抽筋與足底筋膜炎。',
        videoSearchQuery: 'Eccentric+Calf+Raises+Soleus+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Eccentric+Calf+Raises+Soleus+runners',
        realCoachFocus: '真人教練示範重點：頂峰墊腳維持 1 秒，下落時數「3、2、1」以極慢離心控制下降；微曲膝提踵能精準強化比目魚肌。',
        cues: [
          '赤足或穿慢跑鞋站立，雙腳與骨盆同寬。',
          '先進行直膝提踵：大腳趾發力將腳後跟向上提至最高點（頂峰停 1 秒）。',
          '以 3 秒緩慢速度離心下降腳後跟。',
          '後半段可微屈膝 20 度進行提踵，精準針對深層「比目魚肌」刺激。'
        ],
        mistakes: ['重力自由落體下落（缺少 3 秒離心控制）', '腳踝向外側翻（踝關節不穩定）'],
        animationType: 'calf'
      }
    ]
  },
  agility: {
    id: 'agility',
    title: '跑者敏捷性、步頻與觸地反應訓練',
    subtitle: '縮短觸地時間 (GCT)、增強足踝剛性彈簧與快肌反應',
    category: '敏捷與神經反應',
    defaultWorkSec: 30,
    defaultRestSec: 20,
    defaultRounds: 3,
    color: '#06b6d4',
    accentClass: 'badge-cyan',
    description: '針對跑步步頻、阿基里斯腱剛性彈性（Elastic Recoil）與神經肌肉徵召速度設計。在家無需器材，以地板十字與敏捷步法喚醒快肌纖維。',
    exercises: [
      {
        id: 'a1',
        name: '踝關節波戈彈跳 (阿基里斯腱彈簧)',
        enName: 'Ankle Pogo Hops',
        targetMuscles: ['阿基里斯腱 (彈性儲能)', '小腿肌群', '足弓彈性', '神經反應'],
        workSec: 30,
        restSec: 20,
        difficulty: '基礎',
        purpose: '訓練下肢剛性 (Leg Stiffness)，縮短著地時間，將每一次落地化為向前推進的彈簧。',
        videoSearchQuery: 'Ankle+Pogo+Hops+plyometrics+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Ankle+Pogo+Hops+plyometrics+runners',
        realCoachFocus: '真人教練示範重點：膝蓋維持微曲鎖定不深蹲，純以踝關節與前腳掌彈跳；空中腳尖上勾（背屈），落地極短即刻反彈。',
        cues: [
          '膝蓋微曲保持彈性（不深蹲），主要靠腳踝與足弓彈性垂直跳躍。',
          '在空中時腳尖主動向上勾（踝關節背屈），落地以前腳掌快速反彈。',
          '接觸地面時間要「極短」，想像地面很燙，發出清脆輕巧的著地聲。',
          '雙手自然擺臂配合節奏。'
        ],
        mistakes: ['膝蓋過度彎曲深蹲起跳', '全腳掌或腳跟重重著地', '身體後仰'],
        animationType: 'pogo'
      },
      {
        id: 'a2',
        name: '十字四象限快速點地跳',
        enName: '4-Square / Line Quick Hops',
        targetMuscles: ['多方向踝關節穩定肌', '小腿', '本體感覺', '敏捷神經系統'],
        workSec: 30,
        restSec: 20,
        difficulty: '中級',
        purpose: '提升多方向動態穩定性，強化腳踝在越野或路跑不平路面的避震應變。',
        videoSearchQuery: 'Four+Square+Hops+agility+drill+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Four+Square+Hops+agility+drill',
        realCoachFocus: '真人教練示範重點：在地板想像十字「十」，以極快頻率順時針/逆時針輕快跳躍，保持核心前傾穩定。',
        cues: [
          '在地板上想像一個十字「十」字線，將地面分成 4 個象限 (1-2-3-4)。',
          '雙腳併攏或微開，依照「前-右-後-左」順時針方向連續輕快跳躍。',
          '前 15 秒順時針，後 15 秒逆時針切換方向。',
          '保持軀幹穩定朝前，重心微前傾，步頻越快越好。'
        ],
        mistakes: ['跳躍幅度過大導致速度變慢', '著地沉重', '身體失去重心傾斜'],
        animationType: 'crossHop'
      },
      {
        id: 'a3',
        name: '側向滑冰者彈跳 + 單腳緩衝平衡',
        enName: 'Skater Hops with Stick',
        targetMuscles: ['臀中肌 (橫向爆發)', '股四頭肌', '踝關節穩定肌', '單腳避震'],
        workSec: 30,
        restSec: 20,
        difficulty: '中級',
        purpose: '跑步是連續的單腳支撐跳躍，此動作強化單側著地減速緩衝（Deceleration）與橫向防護力。',
        videoSearchQuery: 'Skater+Hops+with+Stick+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Skater+Hops+with+Stick+runners',
        realCoachFocus: '真人教練示範重點：橫向側跳落地時「凍結定格 1 秒 (Stick)」，膝關節對準第二腳趾吸收緩衝，再反向彈跳。',
        cues: [
          '單腳站立微蹲蓄力，向側方水平發力彈跳跳躍至另一腳。',
          '著地腳順勢屈膝屈髖，如彈簧般吸收衝擊力，後腳向後懸空交叉。',
          '在著地瞬間穩定「凍結停住 1 秒」（Stick the Landing），確認膝蓋對準第二腳趾。',
          '接著換邊向另一側彈跳，節奏分明。'
        ],
        mistakes: ['落地時膝蓋向內扣 (Valgus)', '落地不穩就急著跳下一拍', '背部過度彎曲'],
        animationType: 'skater'
      },
      {
        id: 'a4',
        name: '快速進出小碎步 (180+ 高步頻點火)',
        enName: 'In-and-Out Fast Feet (High Cadence Drill)',
        targetMuscles: ['快速肌纖維', '髖屈肌', '腓腸肌', '心肺反應'],
        workSec: 30,
        restSec: 20,
        difficulty: '基礎',
        purpose: '刺激中樞神經系統發送高頻運動訊號，習慣 180~190 spm 的高步頻腳步轉換。',
        videoSearchQuery: 'Fast+Feet+in+and+out+agility+drill',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Fast+Feet+in+and+out+agility+drill',
        realCoachFocus: '真人教練示範重點：重心微前傾，按照「開-開-合-合」口訣極速踏步，手臂大幅擺臂帶動雙腳步頻。',
        cues: [
          '雙膝微曲，軀幹微前傾，腳後跟微懸空。',
          '按照「左出-右出-左進-右進 (Out-Out-In-In)」口訣快速踏步。',
          '手臂維持跑步擺臂姿勢，手臂擺得越快，腳步就跟著越快。',
          '全力衝刺 30 秒，感受雙腳像在熱鐵板上踩踏。'
        ],
        mistakes: ['腳掌重踏發出巨大撞擊聲', '擺臂僵硬不協調', '站得太直失去重心'],
        animationType: 'fastFeet'
      },
      {
        id: 'a5',
        name: '跑者高抬腿 1-2-3 節奏鎖定',
        enName: 'High Knee Rhythm & Stick',
        targetMuscles: ['髂腰肌 (提膝動力)', '支撐臀大肌', '腹核心', '跑步姿態整合'],
        workSec: 30,
        restSec: 20,
        difficulty: '中級',
        purpose: '將敏捷速度與跑姿核心剛性結合，強化垂直推進與著地瞬間骨盆鎖定能力。',
        videoSearchQuery: 'High+Knee+stick+drill+runners',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=High+Knee+stick+drill+runners',
        realCoachFocus: '真人教練示範重點：原地節奏高抬腿「1-2-3！」，第 3 拍單腳提膝至水平維持 1.5 秒定格，檢視核心挺拔與支撐腿伸直。',
        cues: [
          '以快速節奏原地高抬腿：「1 - 2 - 3！」',
          '在第 3 拍單腳提膝至水平，支撐腳伸直踩實，維持單腳平衡停頓 1.5 秒。',
          '停頓時檢查：提膝側腳尖向上勾、核心收緊、脊椎挺拔、對角手臂屈肘 90 度。',
          '緊接著換邊進行下一輪 1-2-3 停頓。'
        ],
        mistakes: ['第 3 拍停頓時身體向後仰', '提膝高度不足 90 度', '支撐腿膝蓋鬆軟'],
        animationType: 'highKnee'
      },
      {
        id: 'a6',
        name: '登山者變速爆發衝刺',
        enName: 'Mountain Climber Tempo Bursts',
        targetMuscles: ['深層核心', '髖屈肌群', '肩胛穩定帶', '下肢推蹬耐力'],
        workSec: 30,
        restSec: 20,
        difficulty: '中高級',
        purpose: '高強度動態核心訓練，強化高心率下的髖部高速屈伸與抗疲勞能力。',
        videoSearchQuery: 'Mountain+Climbers+exercise+proper+form',
        embedVideoUrl: 'https://www.youtube-nocookie.com/embed?listType=search&list=Mountain+Climbers+exercise+proper+form',
        realCoachFocus: '真人教練示範重點：手掌置於肩膀正下方，腹部鎖死不塌腰，以「2秒慢提膝 - 5秒極速衝刺」交替節奏驅動髖關節。',
        cues: [
          '俯臥撐支撐姿勢，手掌在肩膀正下方，腹部與臀部收緊。',
          '以「2 秒慢速提膝 - 5 秒極速衝刺」交替節奏進行。',
          '膝蓋盡可能向前貼近胸口，腳尖不拖地。',
          '整個過程中臀部保持平穩，不上下劇烈晃動。'
        ],
        mistakes: ['臀部撅得太高呈三角形', '下背凹陷造成腰部受力', '手肘過度鎖死'],
        animationType: 'climber'
      }
    ]
  }
};
