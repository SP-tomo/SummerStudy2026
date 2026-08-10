import { useState, useEffect } from 'react';
import { Calendar, LayoutDashboard, Map as MapIcon, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import './App.css';

// Load Data
import dailyPlan from './data/daily_plan.json';
import subjectRoadmap from './data/subject_roadmap.json';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [today, setToday] = useState(dailyPlan[0]);
  
  // Find "today's" plan or default to first day
  useEffect(() => {
    // In a real app we'd match with new Date(), but for demo we just use the first day or specific day
    const targetDate = "2026-08-10"; 
    const todayPlan = dailyPlan.find((d: any) => d['日付'] === targetDate) || dailyPlan[0];
    setToday(todayPlan);
  }, []);

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (taskName: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskName) 
        ? prev.filter(t => t !== taskName) 
        : [...prev, taskName]
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-grid animate-fade-in">
      <div className="glass-card">
        <div className="section-title">
          <Clock size={20} className="text-gradient" />
          <span>今日のタスク ({today['日付']}) - {today['フェーズ']}</span>
        </div>
        <div className="task-list">
          {[
            { time: "午前", task: today['午前'] },
            { time: "午後", task: today['午後'] },
            { time: "夕方/夜", task: today['夕方/夜'] },
            { time: "TOEIC", task: today['TOEIC'] }
          ].map((item, idx) => item.task && (
            <div key={idx} className="task-item" onClick={() => toggleTask(item.task)}>
              <div className="task-info">
                <span className="task-time">{item.time}</span>
                <span className={`task-name ${completedTasks.includes(item.task) ? 'text-secondary' : ''}`} 
                      style={{ textDecoration: completedTasks.includes(item.task) ? 'line-through' : 'none' }}>
                  {item.task}
                </span>
              </div>
              <div className={`task-checkbox ${completedTasks.includes(item.task) ? 'checked' : ''}`}>
                {completedTasks.includes(item.task) && <CheckCircle2 size={16} color="white" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <div className="section-title">
            <TrendingUp size={20} className="text-gradient" />
            <span>本日の進捗</span>
          </div>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-value">{today['時間(h)']}h</div>
              <div className="stat-label">予定学習時間</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{completedTasks.length}</div>
              <div className="stat-label">完了タスク</div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-title" style={{ marginBottom: '0.5rem' }}>Focus</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{today['Focus']}</p>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="glass-card animate-fade-in">
      <div className="section-title">スケジュール (8月)</div>
      <div className="calendar-grid">
        {['月', '火', '水', '木', '金', '土', '日'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {/* Mock empty days for offset */}
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        <div className="calendar-day" style={{ opacity: 0 }}></div>
        {dailyPlan.filter((d: any) => d['日付'].startsWith('2026-08')).map((day: any, idx: number) => (
          <div key={idx} className={`calendar-day ${day['日付'] === today['日付'] ? 'today' : ''}`}>
            <div className="day-number">{day['日付'].split('-')[2]}</div>
            {day['区分'] === '休養' ? (
              <div className="day-task" style={{ background: 'var(--success)' }}>休養日</div>
            ) : (
              <>
                <div className="day-task">{day['午前']}</div>
                <div className="day-task">{day['午後']}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoadmap = () => (
    <div className="roadmap-grid animate-fade-in">
      {subjectRoadmap.map((subject: any, idx: number) => (
        <div key={idx} className="glass-card subject-card">
          <div className="subject-header">
            <span className="subject-name">{subject['科目']}</span>
            <span className="badge badge-purple">{subject['優先']}</span>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              勝ち筋
            </div>
            <div>{subject['この夏の勝ち筋']}</div>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              8月の目標
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
              {subject['8月']}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1 className="text-gradient">Summer Study Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>2026年 夏休み特別学習計画</p>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            Today
          </button>
          <button 
            className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={18} />
            Calendar
          </button>
          <button 
            className={`nav-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <MapIcon size={18} />
            Roadmap
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'roadmap' && renderRoadmap()}
      </main>
    </div>
  );
}

export default App;
