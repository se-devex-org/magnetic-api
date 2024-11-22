from datetime import datetime
from typing import Optional
from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from services.call_log_service import CallLogService
from models.call_log import CallLog

call_logs = Blueprint('call_logs', __name__)

def get_call_log_service():
    return CallLogService(current_app.db.session)

@call_logs.route('/api/call-logs', methods=['GET'])
@login_required
def get_supervisor_logs():
    """Get all call logs for the current supervisor"""
    service = get_call_log_service()
    logs = service.get_supervisor_logs(current_user.id)
    return jsonify([{
        'id': log.id,
        'timestamp': log.timestamp.isoformat(),
        'caller_number': log.caller_number,
        'caller_name': log.caller_name,
        'called_number': log.called_number,
        'duration': log.duration,
        'notes': log.notes,
        'status': log.status
    } for log in logs])

@call_logs.route('/api/call-logs/<int:log_id>', methods=['GET'])
@login_required
def get_call_log(log_id: int):
    """Get a specific call log by ID"""
    service = get_call_log_service()
    log = service.get_call_log(log_id)

    if not log or log.supervisor_id != current_user.id:
        return jsonify({'error': 'Call log not found'}), 404

    return jsonify({
        'id': log.id,
        'timestamp': log.timestamp.isoformat(),
        'caller_number': log.caller_number,
        'caller_name': log.caller_name,
        'called_number': log.called_number,
        'duration': log.duration,
        'notes': log.notes,
        'status': log.status
    })

@call_logs.route('/api/call-logs', methods=['POST'])
@login_required
def add_call_log():
    """Add a new call log"""
    data = request.get_json()

    required_fields = ['caller_number', 'called_number']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    service = get_call_log_service()
    log = service.add_call_log(
        supervisor_id=current_user.id,
        caller_number=data['caller_number'],
        called_number=data['called_number'],
        caller_name=data.get('caller_name'),
        duration=data.get('duration'),
        notes=data.get('notes'),
        status=data.get('status', 'completed')
    )

    return jsonify({
        'id': log.id,
        'timestamp': log.timestamp.isoformat(),
        'caller_number': log.caller_number,
        'caller_name': log.caller_name,
        'called_number': log.called_number,
        'duration': log.duration,
        'notes': log.notes,
        'status': log.status
    }), 201

@call_logs.route('/api/call-logs/search', methods=['GET'])
@login_required
def search_logs():
    """Search call logs with filters"""
    caller_number = request.args.get('caller_number')
    called_number = request.args.get('called_number')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    status = request.args.get('status')

    if start_date:
        start_date = datetime.fromisoformat(start_date)
    if end_date:
        end_date = datetime.fromisoformat(end_date)

    service = get_call_log_service()
    logs = service.search_logs(
        supervisor_id=current_user.id,
        caller_number=caller_number,
        called_number=called_number,
        start_date=start_date,
        end_date=end_date,
        status=status
    )

    return jsonify([{
        'id': log.id,
        'timestamp': log.timestamp.isoformat(),
        'caller_number': log.caller_number,
        'caller_name': log.caller_name,
        'called_number': log.called_number,
        'duration': log.duration,
        'notes': log.notes,
        'status': log.status
    } for log in logs])
