from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from models.call_log import CallLog

class CallLogService:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    def get_supervisor_logs(self, supervisor_id: int) -> List[CallLog]:
        """Get all call logs for a specific supervisor"""
        return self.db_session.query(CallLog)\
            .filter(CallLog.supervisor_id == supervisor_id)\
            .order_by(CallLog.timestamp.desc())\
            .all()

    def add_call_log(self, 
                      supervisor_id: int,
                      caller_number: str,
                      called_number: str,
                      caller_name: Optional[str] = None,
                      duration: Optional[float] = None,
                      notes: Optional[str] = None,
                      status: str = 'completed') -> CallLog:
        """Add a new call log entry"""
        call_log = CallLog(
            supervisor_id=supervisor_id,
            caller_number=caller_number,
            called_number=called_number,
            caller_name=caller_name,
            duration=duration,
            notes=notes,
            status=status,
            timestamp=datetime.utcnow()
        )
        self.db_session.add(call_log)
        self.db_session.commit()
        return call_log

    def get_call_log(self, log_id: int) -> Optional[CallLog]:
        """Get a specific call log by ID"""
        return self.db_session.query(CallLog).get(log_id)

    def search_logs(self,
                    supervisor_id: int,
                    caller_number: Optional[str] = None,
                    called_number: Optional[str] = None,
                    start_date: Optional[datetime] = None,
                    end_date: Optional[datetime] = None,
                    status: Optional[str] = None) -> List[CallLog]:
        """Search call logs with various filters"""
        query = self.db_session.query(CallLog)\
            .filter(CallLog.supervisor_id == supervisor_id)

        if caller_number:
            query = query.filter(CallLog.caller_number.like(f'%{caller_number}%'))
        if called_number:
            query = query.filter(CallLog.called_number.like(f'%{called_number}%'))
        if start_date:
            query = query.filter(CallLog.timestamp >= start_date)
        if end_date:
            query = query.filter(CallLog.timestamp <= end_date)
        if status:
            query = query.filter(CallLog.status == status)

        return query.order_by(CallLog.timestamp.desc()).all()

    def update_call_log(self,
                        log_id: int,
                        notes: Optional[str] = None,
                        status: Optional[str] = None,
                        duration: Optional[float] = None) -> Optional[CallLog]:
        """Update an existing call log"""
        call_log = self.get_call_log(log_id)
        if not call_log:
            return None

        if notes is not None:
            call_log.notes = notes
        if status is not None:
            call_log.status = status
        if duration is not None:
            call_log.duration = duration

        self.db_session.commit()
        return call_log
