from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CallLog(Base):
    """Model for storing monitored call information"""

    __tablename__ = 'call_logs'

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    caller_number = Column(String(20), nullable=False)
    caller_name = Column(String(100))
    called_number = Column(String(20), nullable=False) 
    duration = Column(Float)  # Duration in seconds
    supervisor_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    notes = Column(Text)
    status = Column(String(20))  # e.g. 'completed', 'dropped', etc.

    # Relationship to supervisor
    supervisor = relationship('User', back_populates='monitored_calls')

    def __repr__(self):
        return f'<CallLog {self.id}: {self.caller_number} -> {self.called_number} @ {self.timestamp}>'
